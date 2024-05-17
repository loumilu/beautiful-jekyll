// Dean Attali / Beautiful Jekyll 2023

let BeautifulJekyllJS = {

  bigImgEl : null,
  numImgs : null,

  init : function() {
    setTimeout(BeautifulJekyllJS.initNavbar, 10);

    // Shorten the navbar after scrolling a little bit down

    // On mobile, hide the avatar when expanding the navbar menu
    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

    // show the big header image
    BeautifulJekyllJS.initImgs();

    BeautifulJekyllJS.initSearch();
  },

  initNavbar : function() {
    // Set the navbar-dark/light class based on its background color
    const rgb = $('.navbar').css("background-color").replace(/[^\d,]/g,'').split(",");
    const brightness = Math.round(( // http://www.w3.org/TR/AERT#color-contrast
      parseInt(rgb[0]) * 299 +
      parseInt(rgb[1]) * 587 +
      parseInt(rgb[2]) * 114
    ) / 1000);
    if (brightness <= 125) {
      $(".navbar").removeClass("navbar-light").addClass("navbar-dark");
    } else {
      $(".navbar").removeClass("navbar-dark").addClass("navbar-light");
    }
  },

  initImgs : function() {
    // If the page was large images to randomly select from, choose an image
    if ($("#header-big-imgs").length > 0) {
      BeautifulJekyllJS.bigImgEl = $("#header-big-imgs");
      BeautifulJekyllJS.numImgs = BeautifulJekyllJS.bigImgEl.attr("data-num-img");

      // 2fc73a3a967e97599c9763d05e564189
      // set an initial image
      const imgInfo = BeautifulJekyllJS.getImgInfo();
      const src = imgInfo.src;
      const desc = imgInfo.desc;
      BeautifulJekyllJS.setImg(src, desc);

      // For better UX, prefetch the next image so that it will already be loaded when we want to show it
      const getNextImg = function() {
        const imgInfo = BeautifulJekyllJS.getImgInfo();
        const src = imgInfo.src;
        const desc = imgInfo.desc;

        const prefetchImg = new Image();
        prefetchImg.src = src;
        // if I want to do something once the image is ready: `prefetchImg.onload = function(){}`

        setTimeout(function(){
          const img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
          $(".intro-header.big-img").prepend(img);
          setTimeout(function(){ img.css("opacity", "1"); }, 50);

          // after the animation of fading in the new image is done, prefetch the next one
          //img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
          setTimeout(function() {
            BeautifulJekyllJS.setImg(src, desc);
            img.remove();
            getNextImg();
          }, 1000);
          //});
        }, 6000);
      };

      // If there are multiple images, cycle through them
      if (BeautifulJekyllJS.numImgs > 1) {
        getNextImg();
      }
    }
  },

  getImgInfo : function() {
    const randNum = Math.floor((Math.random() * BeautifulJekyllJS.numImgs) + 1);
    const src = BeautifulJekyllJS.bigImgEl.attr("data-img-src-" + randNum);
    const desc = BeautifulJekyllJS.bigImgEl.attr("data-img-desc-" + randNum);

    return {
      src : src,
      desc : desc
    }
  },

  setImg : function(src, desc) {
    $(".intro-header.big-img").css("background-image", 'url(' + src + ')');
    if (typeof desc !== typeof undefined && desc !== false) {
      $(".img-desc").text(desc).show();
    } else {
      $(".img-desc").hide();
    }
  },

  initSearch : function() {
    if (!document.getElementById("beautifuljekyll-search-overlay")) {
      return;
    }

    $("#nav-search-link").click(function(e) {
      e.preventDefault();
      $("#beautifuljekyll-search-overlay").show();
      $("#nav-search-input").focus().select();
      $("body").addClass("overflow-hidden");
    });
    $("#nav-search-exit").click(function(e) {
      e.preventDefault();
      $("#beautifuljekyll-search-overlay").hide();
      $("body").removeClass("overflow-hidden");
    });
    $(document).on('keyup', function(e) {
      if (e.key == "Escape") {
        $("#beautifuljekyll-search-overlay").hide();
        $("body").removeClass("overflow-hidden");
      }
    });
  }
};

$(function() {
  $('#change-skin').on('click', function () {
    $("body").toggleClass("page-dark-mode");
    localStorage.setItem('bj-dark-mode', $("body").hasClass("page-dark-mode"));
    BeautifulJekyllJS.initNavbar();
  });
  if (localStorage.getItem('bj-dark-mode') === 'true') {
    $('#change-skin').trigger('click');
  }
});


// 2fc73a3a967e97599c9763d05e564189

document.addEventListener('DOMContentLoaded', BeautifulJekyllJS.init);

document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.box-note, .box-note-neutral, .box-warning, .box-error, .box-success, .box-question');

  boxes.forEach(box => {
    let title, iconClass, textColor;
    if (box.classList.contains('box-note')) {
      title = 'Note:';
      iconClass = 'mdi--info-circle';
      textColor = 'rgb(64, 64, 64)';
    } else if (box.classList.contains('box-warning')) {
      title = 'Warning:';
      iconClass = 'mdi--alert-triangle';
      textColor = 'white';
    } else if (box.classList.contains('box-error')) {
      title = 'Error:';
      iconClass = 'mdi--alert-box';
      textColor = 'white';
    } else if (box.classList.contains('box-success')) {
      title = 'Success:';
      iconClass = 'mdi--check-circle';
      textColor = 'rgb(64, 64, 64)';
    }
    else if (box.classList.contains('box-question')) {
      title = 'Inquiry:';
      iconClass = 'mdi--info-square';
      textColor = 'white';
    }

    if (title && iconClass && textColor) {
      box.style.color = textColor; // Apply text color to the entire box

      const titleElement = document.createElement('div');
      titleElement.classList.add('box-title');
      
      const textElement = document.createElement('span');
      textElement.textContent = title;
      textElement.style.display = 'flex';
      textElement.style.alignItems = 'center';

      const iconElement = document.createElement('span');
      iconElement.classList.add(iconClass);
      iconElement.style.marginRight = '0.5rem';

      textElement.insertBefore(iconElement, textElement.firstChild);
      titleElement.appendChild(textElement);
      box.insertAdjacentElement('afterbegin', titleElement);
    }

    // Parse and process the content inside the box
    let content = box.innerHTML;
    const endMarker = '{end: .box-note}';
    const endMarkerIndex = content.indexOf(endMarker);
    
    if (endMarkerIndex !== -1) {
      // Extract the content before the end marker and preserve spaces and newlines
      content = content.slice(0, endMarkerIndex).replace(/\n/g, '<br>');
      box.innerHTML = content;
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach((block) => {
    // Create a container for the code block
    const codeBlockContainer = document.createElement('div');
    codeBlockContainer.classList.add('code-block');

    // Wrap the existing code block with the new container
    block.parentNode.replaceChild(codeBlockContainer, block);
    codeBlockContainer.appendChild(block);

    // Create the copy button
    const copyButton = document.createElement('button');
    copyButton.classList.add('copy-button');
    
    // Create the icon element
    const iconElement = document.createElement('span');
    iconElement.classList.add('ph--copy-bold');

    // Append the icon to the button
    copyButton.appendChild(iconElement);
    codeBlockContainer.appendChild(copyButton);

    // Add the click event listener to the copy button
    copyButton.addEventListener('click', () => {
      // Create a textarea element to copy the code to clipboard
      const textarea = document.createElement('textarea');
      textarea.value = block.textContent;
      document.body.appendChild(textarea);

      // Select and copy the text
      textarea.select();
      document.execCommand('copy');

      // Remove the textarea element
      document.body.removeChild(textarea);

      // Provide feedback to the user
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.innerHTML = ''; // Clear the text content
        copyButton.appendChild(iconElement); // Add the icon back
      }, 2000);
    });
  });
});
