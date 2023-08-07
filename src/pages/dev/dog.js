import { html, reactive } from '@arrow-js/core'
import RestUtility from '/src/utils/rest.js'

import '/src/styles/reset.css'
import './dog.css'

const data = reactive({
  isPending: false,
  imageUrl: '',
})

const fetchDogImage = async () => {
  if(data.isPending) return;

  data.isPending = true;
  const response = await RestUtility.request(
    'GET',
    'https://dog.ceo',
    '/api/breeds/image/random'
  );
  const imageUrl = response.data?.message ?? '';
  data.imageUrl = imageUrl;
  data.isPending = false;
}

html`
  <div class="gallery">
    <img src="${() => data.imageUrl}"></img>
  </div>
  <div class="toolbar">
    <button @click="${fetchDogImage}">${() => data.isPending ? 'Pending...' : 'Fetch!'}</button>
  </div>
`(document.getElementById('arrow'))
