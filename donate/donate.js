// let allListing = localStorage['temuProducts'] ? JSON.parse(localStorage['temuProducts']) : []
// displayProducts()

// Define getImage globally so it can be called from HTML onchange

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCMDYlFX-iCBtWM5Feqc1Sg72lgr2AlAus",
  authDomain: "zero-hunger-project-c92ea.firebaseapp.com",
  databaseURL: "https://zero-hunger-project-c92ea-default-rtdb.firebaseio.com",
  projectId: "zero-hunger-project-c92ea",
  storageBucket: "zero-hunger-project-c92ea.firebasestorage.app",
  messagingSenderId: "242178592978",
  appId: "1:242178592978:web:cb8b5439c5f59982be1d0b"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('donateForm');
    const formMsg = document.getElementById('formMsg');
    const statNumber = document.querySelector('.stat-number');
    const mealBadge = document.querySelector('.meal-badge');
    const openFormBtn = document.getElementById('openFormBtn');
    const getImage = document.getElementById('Image')

    // simple handler for 'Share Your First Meal' focus behavior
    if (openFormBtn) {
        openFormBtn.addEventListener('click', () => {
            const firstInput = document.querySelector('#donateForm .form-control');
            if (firstInput) firstInput.focus();
        });
    }

    if (!form) return;

    getImage.addEventListener('change', () => {
        const imageInput = document.getElementById('Image');
        const displayPic = document.getElementById('displayImage');

        if (imageInput.files && imageInput.files[0]) {
            displayPic.src = URL.createObjectURL(imageInput.files[0]);
            // console.log(displayPic.src);
        }
    })

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        formMsg.innerHTML = '';

        const data = new FormData(form);
        const imageInput = document.getElementById('Image');
        const image = imageInput.files[0];
        const mealNumber = parseInt(data.get('meal number') || '0', 10);
        const mealName = (data.get('name') || '').trim();
        const location = (data.get('location') || '').trim();
        const note = (data.get('note') || '').trim();

        // Basic validation
        if (!image || mealNumber <= 0 || !location || !mealName) {
            formMsg.innerHTML = '<div class="alert alert-danger">Please upload an image, meal name, number of meals and pickup location.</div>';
            return;
        } else {
            const listing = {
                image: URL.createObjectURL(image),
                mealNumber: mealNumber,
                mealName: mealName,
                location: location,
                note:note
            }
            console.log(listing);
            
            // Simulate success: update counters and show message
            formMsg.innerHTML = '<div class="alert alert-success">Thanks, ' + (name.split(' ')[0] || name) + '! Your listing for ' + mealNumber + ' meal' + (mealNumber > 1 ? 's' : '') + ' was posted.</div>';

            // update stat and badge (simple numeric increment)
            const current = parseInt(statNumber.textContent || '0', 10) || 0;
            statNumber.textContent = current + mealNumber;

            // update meal badge text
            const badgeCount = parseInt(mealBadge.textContent.replace(/[^0-9]/g, '') || '0', 10) || 0;
            mealBadge.textContent = 'Meal shared ' + (badgeCount + mealNumber);

            // reset form after small delay to let user see message
            setTimeout(() => {
                form.reset();
            }, 500);
        }
    })
})

