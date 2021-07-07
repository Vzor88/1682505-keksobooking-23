const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const loadAvatar = document.querySelector('#avatar');
const loadPicture = document.querySelector('#images');
const avatarPreview = document.querySelector('.ad-form-header__preview-image');
const picturePreview = document.querySelector('.ad-form__photo');

const getLoadFiles = (fieldLoad, fieldPreview) => {
  const file = fieldLoad.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((string) => fileName.endsWith(string));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      fieldPreview.src = reader.result;
      if (fieldLoad === loadPicture) {
        const addImage = document.createElement('img');
        addImage.classList.add('ad-form__photo-picture');
        addImage.style.width = '70px';
        addImage.style.height = '70px';
        addImage.src = reader.result;
        fieldPreview.appendChild(addImage);
      }
    });
    reader.readAsDataURL(file);
  }
};

loadAvatar.addEventListener('change', () => {
  getLoadFiles(loadAvatar, avatarPreview);
});

loadPicture.addEventListener('change', () => {
  getLoadFiles(loadPicture, picturePreview);
});

export {avatarPreview};
