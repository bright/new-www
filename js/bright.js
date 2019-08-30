(function () {

    document.addEventListener('submit', function (e) {
        const form = e.target;
        const formType = form.dataset.formType;

        function findRelative(element, selector) {
            do {
                const target = element.querySelector(selector)
                if (target) {
                    return target
                }
                element = element.parentNode;
            } while (element);
            return null;
        }


        const doneNode = findRelative(form, '.w-form-done');
        const failNode = findRelative(form, '.w-form-fail');
        const submitButton = form.querySelector('[type=submit]');
        function showDone() {
            doneNode.style.display = 'block';
            failNode.style.display = 'none';
            submitButton.style.display = 'none';
        }

        function showFail() {
            doneNode.style.display = 'none';
            failNode.style.display = 'block';
        }

        if (formType === 'contact' || formType === 'start-a-project') {
            e.preventDefault();
            fetch("https://prod-38.northeurope.logic.azure.com/workflows/1d03b23263424a8a8bef4287c5c50add/triggers/manual/paths/invoke/contact?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uAHDF64Wovfav_yXqKz2l2m_MZ-f9kAzDx6i49kDGq0", {
                method: 'POST',
                body: new FormData(form),
            }).then(showDone, showFail)
        }

        if (formType === 'job') {
            e.preventDefault();
            fetch("https://prod-50.northeurope.logic.azure.com/workflows/ebe3138deb79483499fece1fdb88d591/triggers/manual/paths/invoke/job?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZFCcJhp_9FTFToWYjRfl4uoeqGDQOS-_4z0TpVjAgUk", {
                method: 'POST',
                body: new FormData(form),
            }).then(showDone, showFail)
        }
    }, true)
}());
