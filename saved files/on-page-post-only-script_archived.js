function getStickyTopOffset() {
  return window.innerWidth > 768 ? 72 : 59;
}
window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
  Redactor('#entry', {
    theme: 'light',
    image: {
      wrapWithStyle: true,
    },
    embed: {
      responsive: true,
    },
    plugins: ['ai'],
    ai: {
      text: {
        url: 'https://redactor-ai-worker.square-base-b650.workers.dev/',
        endpoint: 'https://api.openai.com/v1/chat/completions',
        model: 'gpt-4o',
        stream: true,
      },
    },

    // Additional RedactorX initialization options here
    toolbar: {
      hide: ['html', 'deleted', 'table', 'moreinline', 'bold', 'italic'],
      stickyTopOffset: getStickyTopOffset(), // Use the dynamic function
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
    image: {
      upload: 'https://xbqe-ffv8-sc86.a2.xano.io/api:JNbrmes6/cf/images_rich_text_main',
      //select: '/images/images.json',
      url: false,
      name: 'image',
      multiple: false,
    },
    subscribe: {
      'app.start': function () {
        // Access and set min-height of the editor content area
        var $editorNode = this.app.editor.dom('.rx-editor.rx-content');
        $editorNode.css({ 'min-height': '25rem' /* padding: "1.75rem" */ });
      },
      'image.remove': function (event) {
        let url = event.get('url');
        let id = event.get('id');
      },
      'editor.change': function (event) {
        if (Wized.data && Wized.data.v) {
          Wized.data.v.editBody = this.app.editor.getContent();
        }
      },
    },
  });
});
