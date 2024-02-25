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


async function renderTemplateList(rootNode) {
    const projectId = getProjectFilterValue();
    const search = getSearchFilterValue();
    const commentTemplatesList = await getCommentTemplatesRequest({search, project_id: projectId});
    $('.comment-templates-container').remove();
    $(commentTemplateListComponent(commentTemplatesList)).appendTo(rootNode);
}


async function renderFilters(rootNode) {
    const projectsList = await getProjectsListRequest();
    const filterBar = $(filterBarComponent()).appendTo(rootNode);
    const projectSelect = $(selectProjectComponent(projectsList));
    const templateFilter = $(filterSnippetsComponent());
    const onFilterUpdate = () => renderTemplateList(rootNode);
    projectSelect.appendTo(filterBar);
    templateFilter.appendTo(filterBar);
    templateFilter.on('keyup', onFilterUpdate);
    projectSelect.change(onFilterUpdate);
}


async function renderTemplatesUI(rootNode, editorContainer) {
    try {
        await renderFilters(rootNode);
        await renderTemplateList(rootNode);
    } catch (e) {
        return renderError(rootNode, e + '');
    }
}