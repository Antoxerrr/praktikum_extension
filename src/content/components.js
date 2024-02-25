const ROOT_COMPONENT = '<div class="templates-wrapper"></div>'

function errorComponent(text) {
    return `<div class="block-flex-content-center text-error">${text}</div>`;
}

function selectProjectComponent(projectsList) {
    const select = $.parseHTML('<select id="project-select"></select>');
    $('<option value="">Все проекты</option>').appendTo(select);
    $('<option value="common">Общее</option>').appendTo(select);
    for (const project of projectsList) {
        $(`<option value="${project.id}">${project.name}</option>`).appendTo(select);
    }
    return select;
}

function commentTemplateCardComponent(text) {
    return $.parseHTML(`<div class="comment-template-card">${text}</div>`);
}

function commentTemplateListComponent(commentTemplatesList) {
    const container = $.parseHTML('<div class="comment-templates-container"></div>');
    for (const commentTemplate of commentTemplatesList) {
        const commentTemplateCard = commentTemplateCardComponent(commentTemplate.text);
        $(commentTemplateCard).click(function () {
            navigator.clipboard.writeText($(this).text()).then(() => {});
        });
        $(commentTemplateCard).appendTo(container);
    }
    return container;
}

function filterSnippetsComponent() {
    return  $.parseHTML(`<input type="text" id="snippet-filter-input"/>`);
}

function filterBarComponent() {
    return $.parseHTML(`<div class="filter-bar"></div>`);
}