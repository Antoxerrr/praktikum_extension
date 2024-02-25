const EDITOR_SELECTOR = '.source-tree__comment-editor:not([data-template_targeted])';
const TEXTAREA_SELECTOR = '.comment-editor__textarea'

async function renderUI() {
    setupAPI();
    const editors = $(EDITOR_SELECTOR);
    for (const element of editors) {
        element.dataset.template_targeted = 'true';
        const rootNode = $.parseHTML(ROOT_COMPONENT);
        if (await isAuthenticated()) {
            await renderTemplatesUI(rootNode, element);
        } else {
            renderError(rootNode, 'Авторизация не пройдена.');
        }
        $(rootNode).appendTo($(element));
    }
}

function setupAPI() {
    setHeader();
}

function renderError(rootNode, errorText) {
    $(errorComponent(errorText)).appendTo(rootNode);
}


async function renderTemplatesUI(rootNode, editorContainer) {
    const textarea = $(editorContainer).find(TEXTAREA_SELECTOR);
    try {
        const projectsList = await getProjectsListRequest();
        const commentTemplatesList = await getCommentTemplatesRequest();
        $(selectProjectComponent(projectsList)).appendTo(rootNode);
        $(commentTemplateListComponent(commentTemplatesList, textarea)).appendTo(rootNode);
    } catch (e) {
        return renderError(rootNode, e + '');
    }
}