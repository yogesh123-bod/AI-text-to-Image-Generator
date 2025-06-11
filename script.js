const API_KEY = 'vk-8EkB1E3nssk2HD15M8IODkoxTg9sHYWU15iDi12lS6FgiyP';
const API_URL = 'https://api.vyro.ai/v2/image/generations';

const imageContainer = document.getElementById('imageContainer');
const imageResultElement = document.getElementById('imageResult');

function generateImage() {
  const promptValue = document.getElementById('prompt').value.trim();
  const styleValue = document.getElementById('dropdowmStyles').value;
  const ratioValue = document.getElementById('dropdowmRatio').value;

  if (!promptValue) {
    alert('Please enter a prompt.');
    return;
  }

  setLoadingState(true);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + API_KEY);

  const formData = new FormData();
  formData.append('prompt', promptValue);
  formData.append('style', styleValue);
  formData.append('aspect_ratio', ratioValue);

  fetch(API_URL, {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  })
    .then(response => response.blob())
    .then(blob => {
      const imageUrl = URL.createObjectURL(blob);
      imageResultElement.src = imageUrl;
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while generating the image.');
    })
    .finally(() => {
      setLoadingState(false);
    });
}

function setLoadingState(isLoading) {
  if (isLoading) {
    imageResultElement.style.display = 'none';
    imageContainer.classList.add('loading');
  } else {
    imageResultElement.style.display = 'block';
    imageContainer.classList.remove('loading');
  }
}

function downloadImage() {
  const imageUrl = imageResultElement.src;
  if (!imageUrl || imageUrl.endsWith('example.png')) {
    alert('No generated image to download.');
    return;
  }

  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = 'ai-generated-image.jpg';
  link.click();
}
