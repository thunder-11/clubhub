// Check if Firebase dependencies are available globally (set up in gallery.html)
if (typeof window.firebaseDependencies === 'undefined') {
    console.error('Firebase dependencies not found. Ensure gallery.html loads them.');
}

const {
    db, storage, userId, appId,
    ref, uploadBytesResumable, getDownloadURL,
    collection, query, onSnapshot, addDoc, serverTimestamp,
} = window.firebaseDependencies || {};

const GALLERY_COLLECTION_PATH = (appId) => `artifacts/${appId}/public/data/gallery_images`;

let uploadedFile = null;
let uploadTask = null;

// --- DOM Elements ---
const dropArea = document.getElementById('drop-area');
const fileElem = document.getElementById('fileElem');
const uploadModal = document.getElementById('upload-modal');
const startUploadBtn = document.getElementById('start-upload-btn');
const imageCaptionInput = document.getElementById('image-caption');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const galleryGrid = document.getElementById('gallery-grid');
const emptyGalleryMsg = document.getElementById('empty-gallery-msg');

// =================================================================
// 1. UPLOAD UI & FILE HANDLING
// =================================================================

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Highlight drop area when dragging file over it
function highlight(e) {
    dropArea.classList.add('highlight');
}

function unhighlight(e) {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    unhighlight(e);
    let dt = e.dataTransfer;
    let files = dt.files;

    if (files.length > 0) {
        handleFiles(files);
    }
}

function handleFiles(files) {
    if (files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPEG, PNG, etc.).');
        return;
    }

    uploadedFile = file;
    // Show the upload modal and file name
    uploadModal.classList.remove('hidden');
    startUploadBtn.textContent = `Upload: ${file.name}`;
    progressBar.style.width = '0%';
    progressText.textContent = 'Ready to upload';
}

// Bind drag/drop events
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener('drop', handleDrop, false);

// Bind input change event
fileElem.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFiles(e.target.files);
    }
});


// =================================================================
// 2. FIREBASE STORAGE UPLOAD LOGIC
// =================================================================

startUploadBtn.addEventListener('click', () => {
    if (!uploadedFile) {
        alert('No file selected for upload.');
        return;
    }

    if (!userId) {
        alert('Authentication is still loading. Please wait a moment.');
        return;
    }

    startUploadBtn.disabled = true;
    imageCaptionInput.disabled = true;

    const caption = imageCaptionInput.value.trim() || 'Untitled ClubHub Photo';
    const fileExtension = uploadedFile.name.split('.').pop();
    const storagePath = `gallery_uploads/${userId}/${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, storagePath);

    uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    // Monitor upload progress
    uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.style.width = progress + '%';
            progressText.textContent = `Upload in progress... ${Math.round(progress)}%`;
            console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
            // Handle unsuccessful uploads
            console.error('Upload failed:', error);
            progressText.textContent = 'Upload Failed! Check console.';
            progressBar.style.backgroundColor = '#e74c3c'; // Red
            startUploadBtn.disabled = false;
            imageCaptionInput.disabled = false;
            uploadedFile = null;
        }, 
        () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                
                // Save metadata to Firestore
                saveImageMetadata(downloadURL, caption, storagePath);

                // Reset UI after successful upload
                progressText.textContent = 'Upload Complete!';
                progressBar.style.backgroundColor = '#2ecc71';
                setTimeout(() => {
                    uploadModal.classList.add('hidden');
                    startUploadBtn.disabled = false;
                    imageCaptionInput.disabled = false;
                    imageCaptionInput.value = '';
                    uploadedFile = null;
                }, 2000);
            });
        }
    );
});

// =================================================================
// 3. FIRESTORE DATA SAVING & REAL-TIME DISPLAY
// =================================================================

async function saveImageMetadata(imageUrl, caption, storagePath) {
    try {
        const galleryRef = collection(db, GALLERY_COLLECTION_PATH(appId));
        await addDoc(galleryRef, {
            imageUrl: imageUrl,
            caption: caption,
            uploaderId: userId,
            timestamp: serverTimestamp(),
            storagePath: storagePath
        });
        console.log('Metadata successfully saved to Firestore.');
    } catch (e) {
        console.error('Error saving image metadata:', e);
        alert('Image uploaded, but failed to save to database.');
    }
}

function renderImage(doc) {
    const data = doc.data();
    
    // Create the image element structure
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    imageItem.dataset.id = doc.id;
    
    // Placeholder image URL in case main image fails to load
    const placeholderUrl = `https://placehold.co/280x200/cccccc/333333?text=Loading...`;

    imageItem.innerHTML = `
        <img src="${data.imageUrl}" alt="${data.caption}" loading="lazy" 
             onerror="this.onerror=null; this.src='${placeholderUrl}';">
        <div class="image-info">
            <p class="image-caption">${data.caption}</p>
            <p class="image-uploader">Uploaded by: ${data.uploaderId.substring(0, 8)}...</p>
        </div>
    `;

    // Prepend the new image to the grid (newest first)
    galleryGrid.prepend(imageItem);
}

// Function to start the real-time listener (called after Firebase authentication)
window.startGalleryListeners = (dbInstance, storageInstance, currentUserId, currentAppId) => {
    // Re-assign external references
    window.firebaseDependencies.db = dbInstance;
    window.firebaseDependencies.storage = storageInstance;
    window.firebaseDependencies.userId = currentUserId;
    
    const galleryQuery = query(collection(dbInstance, GALLERY_COLLECTION_PATH(currentAppId)));

    // Real-time listener
    onSnapshot(galleryQuery, (snapshot) => {
        // Clear the initial loading message on first snapshot
        if (galleryGrid.querySelector('.loading-message')) {
            galleryGrid.innerHTML = '';
        }
        
        let hasImages = snapshot.docs.length > 0;
        
        // Toggle the empty message
        emptyGalleryMsg.classList.toggle('hidden', hasImages);

        snapshot.docChanges().forEach((change) => {
            const docId = change.doc.id;
            const existingElement = galleryGrid.querySelector(`[data-id="${docId}"]`);

            if (change.type === 'added') {
                // Ignore if element already exists (due to potential listener quirks)
                if (!existingElement) {
                    renderImage(change.doc);
                }
            }
            if (change.type === 'modified') {
                // Simple re-render or update if needed (not crucial for images, but good practice)
                if (existingElement) {
                    // Update content if needed, but for simplicity, we focus on 'added'
                }
            }
            if (change.type === 'removed') {
                if (existingElement) {
                    existingElement.remove();
                }
            }
        });
    }, (error) => {
        console.error("Failed to listen to gallery updates:", error);
        galleryGrid.innerHTML = `<p class="error">Error loading gallery data.</p>`;
    });
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

// --- MANDATORY FIREBASE SETUP ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

let db, auth, storage, userId = null;

const app = initializeApp(firebaseConfig);
db = getFirestore(app);
auth = getAuth(app);
storage = getStorage(app);

// Authentication must be complete before uploads can start
onAuthStateChanged(auth, async (user) => {
    if (user) {
        userId = user.uid;
    } else {
        try {
            if (initialAuthToken) {
                await signInWithCustomToken(auth, initialAuthToken);
            } else {
                await signInAnonymously(auth);
            }
            userId = auth.currentUser.uid;
        } catch (error) {
            console.error("Admin Auth Error:", error);
        }
    }
});

/**
 * Handles the file upload to Firebase Storage and saves the metadata to Firestore.
 * @param {File} file The image file to upload.
 * @param {string} caption The caption for the image.
 */
async function uploadFileAndSaveMetadata(file, caption) {
    if (!userId) {
        console.error("User not authenticated. Cannot upload.");
        return;
    }

    try {
        const storageRef = ref(storage, `club_gallery/${userId}/${Date.now()}_${file.name}`);
        
        // 1. Upload file to Firebase Storage
        const uploadResult = await uploadBytes(storageRef, file);
        
        // 2. Get the public download URL
        const fileURL = await getDownloadURL(uploadResult.ref);

        // 3. Save the URL and metadata to Firestore (Public Collection)
        const galleryCollectionRef = collection(db, `/artifacts/${appId}/public/data/club_gallery`);
        await addDoc(galleryCollectionRef, {
            url: fileURL,
            caption: caption,
            uploaderId: userId,
            timestamp: Date.now(), // Store Unix timestamp for sorting
            createdAt: serverTimestamp()
        });

        console.log("Upload successful. File URL saved to Firestore:", fileURL);
        return true;

    } catch (error) {
        console.error("Upload process failed:", error);
        return false;
    }
}

// Attach the handler to the form
document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('media-upload-form');
    const uploadButton = uploadForm ? uploadForm.querySelector('button[type="submit"]') : null;

    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fileInput = document.getElementById('media-file');
            const caption = document.getElementById('media-caption').value;
            const file = fileInput.files[0];

            if (!file) return;

            if (uploadButton) uploadButton.textContent = 'Uploading...';

            const success = await uploadFileAndSaveMetadata(file, caption);

            if (uploadButton) {
                if (success) {
                    uploadButton.textContent = 'Upload Successful!';
                    uploadForm.reset();
                    setTimeout(() => { uploadButton.textContent = 'Upload Photo'; }, 2000);
                } else {
                    uploadButton.textContent = 'Upload Failed!';
                    setTimeout(() => { uploadButton.textContent = 'Upload Photo'; }, 2000);
                }
            }
        });
    }
});

