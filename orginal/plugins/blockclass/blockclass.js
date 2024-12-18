/*jshint esversion: 6 */
Redactor.add('plugin', 'blockclass', {
    translations: {
        en: {
            "blockclass": {
                "classname": "Classname"
            }
        }
    },
    defaults: {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 4C6.73478 4 6.48043 4.10536 6.29289 4.29289C6.10536 4.48043 6 4.73478 6 5V12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12V5C4 4.20435 4.31607 3.44129 4.87868 2.87868C5.44129 2.31607 6.20435 2 7 2H14C14.2652 2 14.5196 2.10536 14.7071 2.29289L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12V9H15C14.4696 9 13.9609 8.78929 13.5858 8.41421C13.2107 8.03914 13 7.53043 13 7V4H7ZM15 5.41421L16.5858 7H15V5.41421ZM4.73223 14.7322C5.20107 14.2634 5.83696 14 6.5 14C7.16304 14 7.79893 14.2634 8.26777 14.7322C8.73661 15.2011 9 15.837 9 16.5C9 17.0523 8.55228 17.5 8 17.5C7.44772 17.5 7 17.0523 7 16.5C7 16.3674 6.94732 16.2402 6.85355 16.1464C6.75979 16.0527 6.63261 16 6.5 16C6.36739 16 6.24021 16.0527 6.14645 16.1464C6.05268 16.2402 6 16.3674 6 16.5V19.5C6 19.6326 6.05268 19.7598 6.14645 19.8536C6.24022 19.9473 6.36739 20 6.5 20C6.63261 20 6.75978 19.9473 6.85355 19.8536C6.94732 19.7598 7 19.6326 7 19.5C7 18.9477 7.44772 18.5 8 18.5C8.55228 18.5 9 18.9477 9 19.5C9 20.163 8.73661 20.7989 8.26777 21.2678C7.79893 21.7366 7.16304 22 6.5 22C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V16.5C4 15.837 4.26339 15.2011 4.73223 14.7322ZM10.5858 14.5858C10.9609 14.2107 11.4696 14 12 14H13.25C13.7141 14 14.1592 14.1844 14.4874 14.5126C14.8156 14.8408 15 15.2859 15 15.75C15 16.3023 14.5523 16.75 14 16.75C13.534 16.75 13.1425 16.4313 13.0315 16H12V17H13C13.5304 17 14.0391 17.2107 14.4142 17.5858C14.7893 17.9609 15 18.4696 15 19V20C15 20.5304 14.7893 21.0391 14.4142 21.4142C14.0391 21.7893 13.5304 22 13 22H11.75C10.7837 22 10 21.2163 10 20.25C10 19.6977 10.4477 19.25 11 19.25C11.466 19.25 11.8575 19.5687 11.9685 20H13V19H12C11.4696 19 10.9609 18.7893 10.5858 18.4142C10.2107 18.0391 10 17.5304 10 17V16C10 15.4696 10.2107 14.9609 10.5858 14.5858ZM16.5858 14.5858C16.9609 14.2107 17.4696 14 18 14H19.25C19.7141 14 20.1593 14.1844 20.4874 14.5126C20.8156 14.8408 21 15.2859 21 15.75C21 16.3023 20.5523 16.75 20 16.75C19.534 16.75 19.1425 16.4313 19.0315 16H18L18 17H19C19.5304 17 20.0391 17.2107 20.4142 17.5858C20.7893 17.9609 21 18.4696 21 19V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H17.75C16.7837 22 16 21.2163 16 20.25C16 19.6977 16.4477 19.25 17 19.25C17.466 19.25 17.8575 19.5687 17.9685 20H19V19H18C17.4696 19 16.9609 18.7893 16.5858 18.4142C16.2107 18.0391 16 17.5304 16 17V16C16 15.4696 16.2107 14.9609 16.5858 14.5858Z"/></svg>'
    },
    modals: {
        edit: {
            width: '100%',
            title: '## blockclass.classname ##',
            form: {
                'classname': { type: 'input' }
            },
            footer: {
                save: { title: '## buttons.save ##', command: 'blockclass.save', type: 'primary' },
                cancel: { title: '## buttons.cancel ##', command: 'modal.close' }
            }
        }
    },
    start() {
        let button = {
            icon: this.opts.get('blockclass.icon'),
            command: 'blockclass.popup',
            title: '## blockclass.classname ##',
            position: {
                before: ['duplicate', 'trash']
            }
        };

        this.app.control.add('blockclass', button);
    },
    popup(e, button) {
        let instance = this._getInstance();
        if (!instance) return;

        let classname = instance.getClassname();

        // create
        let stack = this.app.create('stack');
        stack.create('blockclass', this.modals.edit);
        stack.setData({ classname: classname });

        // open
        this.app.modal.open({ name: 'blockclass', stack: stack, focus: 'classname', button: button });
    },
    save(stack) {
        this.app.modal.close();

        let instance = this._getInstance();
        if (!instance) return;

        let old = instance.getClassname();
        let classname = stack.getData('classname');

        instance.getBlock().removeClass(old);
        instance.setClassname(classname);
    },

    // =private
    _getInstance() {
        let instance = this.app.block.get();
        if (!instance) {
            instance = this.app.blocks.get({ first: true, instances: true });
        }

        return instance;
    }
});