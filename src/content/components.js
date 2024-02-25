const ROOT_COMPONENT = '<div class="templates-wrapper"></div>'

function errorComponent(text) {
    return `<div class="block-flex-content-center text-error">${text}</div>`;
}

function selectProjectComponent(projectsList) {
    const select = $.parseHTML('<select class="project-select"></select>');
    $('<option value="">Общее</option>').appendTo(select);
    for (const project of projectsList) {
        $(`<option value="${project.id}">${project.name}</option>`).appendTo(select);
    }
    return select;
}

function commentTemplateCardComponent(text) {
    return $.parseHTML(`<div class="comment-template-card">${text}</div>`);
}

function commentTemplateListComponent(commentTemplatesList, textarea) {
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