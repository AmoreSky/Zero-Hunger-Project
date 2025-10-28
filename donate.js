// let allListing = localStorage['temuProducts'] ? JSON.parse(localStorage['temuProducts']) : []
// displayProducts()

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('donateForm');
    const formMsg = document.getElementById('formMsg');
    const statNumber = document.querySelector('.stat-number');
    const mealBadge = document.querySelector('.meal-badge');
    const openFormBtn = document.getElementById('openFormBtn');

    // simple handler for 'Share Your First Meal' focus behavior
    if (openFormBtn) {
        openFormBtn.addEventListener('click', () => {
            const firstInput = document.querySelector('#donateForm .form-control');
            if (firstInput) firstInput.focus();
        });
    }

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        formMsg.innerHTML = '';

        const data = new FormData(form);
        const displayPic = document.getElementById('displayImage');
        const getImage = data.get('image');
        const meals = parseInt(data.get('meals') || '0', 10);
        const location = (data.get('location') || '').trim();

        getImage.onchange = function() {
            displayPic.src = URL.createObjectURL(getImage.files[0]);
            console.log(displayPic);
            
        }


        // Basic validation
        if (!image || !meals || meals <= 0 || !location) {
            formMsg.innerHTML = '<div class="alert alert-danger">Please upload an image, number of meals and pickup location.</div>';
            return;
        } else {
            const listing = {
                image: URL.createObjectURL(image),
                meals: meals,
                location: location
            }

            // // Simulate success: update counters and show message
            // formMsg.innerHTML = '<div class="alert alert-success">Thanks, ' + (name.split(' ')[0] || name) + '! Your listing for ' + meals + ' meal' + (meals > 1 ? 's' : '') + ' was posted.</div>';

            // // update stat and badge (simple numeric increment)
            // const current = parseInt(statNumber.textContent || '0', 10) || 0;
            // statNumber.textContent = current + meals;

            // // update meal badge text
            // const badgeCount = parseInt(mealBadge.textContent.replace(/[^0-9]/g, '') || '0', 10) || 0;
            // mealBadge.textContent = 'Meal shared ' + (badgeCount + meals);

            // // reset form after small delay to let user see message
            // setTimeout(() => {
            //     form.reset();
            // }, 500);
        }
    })
})

