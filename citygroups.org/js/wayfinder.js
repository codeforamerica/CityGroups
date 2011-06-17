var wayfinder = {}

/**
 * An object that maniplates the interface based on wayfinder commands.
 */
wayfinder.projectPage = {
    hideSideContent : function () {
        var sideContent = $('#sidebar');
        sideContent.fadeOut();
    },
    
    showSideContent : function () {
        var sideContent = $('#sidebar');
        sideContent.fadeIn();
    },
    
    hideTips : function () {
        var tips = $('.wizard-tip');
        tips.fadeOut();
        this.showSideContent();
    },
    
    showTip : function (selector, goesInSide) {
        if (goesInSide) {
            this.hideSideContent();
        }
        
        $(selector).css('display', 'block');
        $(selector).fadeIn();
    }
}


/**
 * ==== ADD MEDIA ====
 */

wayfinder.projectPage.toggleMediaTip = function () {
    $('div.project_image').slideToggle(function () {
        if ($('div.project_image').css('display') !== 'none') {
            wayfinder.projectPage.showTip('.project_image-wizard-tip', true);
        } else {
            wayfinder.projectPage.hideTips();
        }
    });
    return false;
}

/**
 * ==== CHANGE THE DATE ====
 */

wayfinder.projectPage.toggleDeadlineEdit = function () {
    $('[name="project-deadline-formatted"]').focus();
    return false;
}


$(document).ready(function () {
    $('div.project_image').slideUp(0);
    $('.project_image_action_cancel').click(wayfinder.projectPage.toggleMediaTip);
    $('a.action_edit_image').click(wayfinder.projectPage.toggleMediaTip);
    $('a.action_edit_deadline').click(wayfinder.projectPage.toggleDeadlineEdit);
    
    $('[name="project-deadline-formatted"]').css('visibility', 'hidden');
});
