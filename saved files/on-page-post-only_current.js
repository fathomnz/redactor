function showErrorModal(message) {
  const alertElement = document.querySelector('#alert');
  const alertMessageElement = document.querySelector('#alert-message');

  if (alertElement && alertMessageElement) {
    alertMessageElement.textContent = message; // Set the error message in the modal
    alertElement.style.display = 'block'; // Show the modal
    setTimeout(() => {
      alertElement.style.display = 'none'; // Hide the modal after 12 seconds
    }, 12000);
  }
}

window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
  Redactor('#entry', {
    theme: 'light',
    image: {
      wrapWithStyle: true,
      upload: 'https://xbqe-ffv8-sc86.a2.xano.io/api:JNbrmes6/cf/images_rich_text_main',
      url: false,
      name: 'image',
      multiple: false,
    },
    subscribe: {
      'app.start': function () {
        // Restore minimum height for the editor
        const $editorNode = this.app.editor.dom('.rx-editor.rx-content');
        $editorNode.css({ 'min-height': '25rem' });
      },
      'image.upload.error': function (event) {
        const response = event.get('response'); // Get the API response
        if (response && response.error) {
          showErrorModal(response.message); // Display the error message
        }
      },
      'editor.change': function (event) {
        if (Wized.data && Wized.data.v) {
          Wized.data.v.editBody = this.app.editor.getContent();
        }
      },
    },
    toolbar: {
      hide: ['html', 'deleted', 'table', 'moreinline', 'bold', 'italic'],
      stickyTopOffset: window.innerWidth > 768 ? 72 : 59,
    },
    popups: {
      addbar: ['image', 'embed', 'line'],
      format: ['h3', 'h4', 'bold', 'italic', 'text', 'address'],
    },
    extrabar: false,
    link: {
      target: '_blank',
      nofollow: true,
    },
  });
});
