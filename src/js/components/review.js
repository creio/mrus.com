const reviewImage = document?.querySelectorAll('.review-image');

if (reviewImage.length > 0) {
  reviewImage.forEach((wrapper) => {
		const fileInput = wrapper.querySelector('.review-image__file');
    const imageList = wrapper.querySelector('.review-image__list');
		
		function deleteImage() {
			const imageItems = wrapper.querySelectorAll('.review-image__wrapper')

			if (imageItems.length > 0) {
				imageItems.forEach((item) => {
					const deleteBtn = item.querySelector('.js-image-delete')
	
					if (deleteBtn) {
						deleteBtn.addEventListener('click', function() {
							const listItem = this.closest('li');
							listItem.remove();
						})
					}
				})
			}
		}

		deleteImage()

    fileInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];

      if (file && allowedTypes.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = function(e) {
          const imageUrl = e.target.result;

          const newItemHtml = `
            <li>
              <div class="review-image__wrapper">
                <picture class="review-image__picture">
                  <source srcset="${imageUrl}" type="image/webp">
                  <img loading="lazy" src="${imageUrl}" class="review-image__image image" width="70" height="70" alt="Фото">
                </picture>
                <button type="button" class="btn js-image-delete review-image__delete">
                  <span class="icon">
                    <svg>
                      <use xlink:href="img/close.svg#svg-close"></use>
                    </svg>
                  </span>
                </button>
              </div>
            </li>
          `;

          imageList.insertAdjacentHTML('afterbegin', newItemHtml);
					deleteImage()
        };
				
        reader.readAsDataURL(file);
      }
    });
  });
}