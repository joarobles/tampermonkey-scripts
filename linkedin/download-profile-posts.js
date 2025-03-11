// ==UserScript==
// @name         Download Posts from LinkedIn profile
// @namespace    https://rudol.ai
// @version      2025-03-11
// @description  Download a JSON file with LinkedIn posts
// @author       Joaquín Leonel Robles
// @match        https://www.linkedin.com/in/*/recent-activity/all/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=linkedin.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function savePosts() {
        // Seleccionar todos los contenedores de posts
        const postContainers = document.querySelectorAll('.feed-shared-update-v2');

        // Array para almacenar los resultados
        const posts = [];

        // Iterar sobre cada contenedor
        postContainers.forEach(container => {
            // Obtener el texto del post
            const textElement = container.querySelector('.update-components-update-v2__commentary');
            const postText = textElement ? textElement.textContent.trim() : '';

            // Obtener la fecha de publicación (opcional)
            const timeElement = container.querySelector('span.update-components-actor__sub-description > span.visually-hidden');
            const timestamp = timeElement ? timeElement.textContent.trim() : '';

            // Almacenar la información
            posts.push({
                text: postText,
                timestamp: timestamp
            });
        });

        // Convertir el objeto a JSON string
        const jsonString = JSON.stringify(posts);

        // Convertir el JSON string a Base64
        const base64 = btoa(unescape(encodeURIComponent(jsonString)));

        // Crear y hacer clic en el enlace de descarga
        var a = document.createElement('a');
        a.href = 'data:application/json;base64,' + base64;
        a.download = 'posts.json';
        a.click();
    }

    const downloadButton = document.createElement('button');
    downloadButton.onclick = savePosts;
    downloadButton.className = 'artdeco-button artdeco-button--2 artdeco-button--secondary ember-view full-width mt2';

    const buttonText = document.createElement('span');
    buttonText.innerHTML = 'Descargar Publicaciones';
    buttonText.className = 'artdeco-button__text';

    downloadButton.appendChild(buttonText);

    document.getElementsByClassName('pv-recent-activity-top-card__profile-actions')[0].appendChild(downloadButton);
})();