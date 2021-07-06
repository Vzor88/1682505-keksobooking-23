const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const loadAvatar = document.querySelector('#avatar');
const loadPicture = document.querySelector('#images');
const avatarPreview = document.querySelector('.ad-form-header__preview-image');
const picturePreview = document.querySelector('.ad-form__photo');

loadAvatar.addEventListener('change', () => {
  const file = loadAvatar.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((string) => fileName.endsWith(string));

  if(matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

loadPicture.addEventListener('change', () => {
  const file = loadPicture.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((string) => fileName.endsWith(string));

  if(matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const addImage = document.createElement('img');
      addImage.classList.add('ad-form__photo-picture');
      addImage.style.width = '70px';
      addImage.style.height = '70px';
      addImage.src = reader.result;
      picturePreview.appendChild(addImage);
    });
    reader.readAsDataURL(file);
  }
});

export {avatarPreview};
