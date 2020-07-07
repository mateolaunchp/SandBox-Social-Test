let sbc_global_selected_variant = '';
let sbc_global_selected_variant_image = '';
let sbc_global_selected_variant_image_url = '';
let sbc_global_list_full_variants = '';
let sbc_global_selected_option_1 = '';
let sbc_global_selected_option_2 = '';
let sbc_global_selected_option_3 = '';
let sbc_global_full_image_array_array = [];
let sbc_global_full_feed = [];
let sbc_global_current_row = 0;
let sbc_global_full_ig_info = {};
let sbc_global_cart_array = [];
let sbc_global_scroll_page = 0;
let sbc_global_scroll_increment = 0;
let sbc_global_data_id = '';
let sbc_global_current_instagram_image_id = '';
let sbc_global_facebook_url = '';
let sbc_global_twitter_url = '';
let sbc_global_pinterest_url = '';
let sbc_global_email = '';

(function () {
  const script = document.createElement('script');
  script.src = 'https://kit.fontawesome.com/e734e4c010.js';
  const currentDiv = document.getElementById('insert');
  // currentDiv.appendChild(script);
  document.body.insertBefore(script, currentDiv);
  loadShopify();
  // create item select modal
  const modal = document.createElement('div');
  modal.id = 'sbc-modal';
  modal.style.cssText = 'display: none;position: fixed;z-index: 1;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgba(0,0,0,0.4)';

  const modalContent = document.createElement('div');
  modalContent.id = 'sbc-modal-content';
  modalContent.style.cssText = 'background-color: #fefefe;margin: 5% auto;padding: 20px;width:80%;';

  const modalColumn1 = document.createElement('div');
  modalColumn1.id = 'sbc-modal-column1';
  modalColumn1.style.cssText = 'display:inline-block;vertical-align:top;position:relative;';

  const modalColumn2 = document.createElement('div');
  modalColumn2.id = 'sbc-modal-column2';
  modalColumn2.style.cssText = 'display:inline-block;vertical-align:top;margin-left:7%;';

  const modalColumn2Header = document.createElement('div');
  modalColumn2Header.id = 'sbc-modal-column2-header';
  modalColumn2Header.style.cssText = 'width:85%;height:60px;margin-bottom:20px;';

  const modalColumn2Content = document.createElement('div');
  modalColumn2Content.id = 'sbc-modal-column2-content';
  modalColumn2Content.style.cssText = 'width:90%;';

  const modalCloseButton = document.createElement('span');
  modalCloseButton.id = 'sbc-modal-close';
  modalCloseButton.style.cssText = 'color: #333333;float: right;font-size: 50px;cursor:pointer;font-weight:200;';
  modalCloseButton.textContent = '×';
  modalCloseButton.onclick = function () {
    closeModal();
  };

  modalColumn2Header.appendChild(modalCloseButton);
  modalColumn2.appendChild(modalColumn2Header);
  modalColumn2.appendChild(modalColumn2Content);
  modalContent.appendChild(modalColumn1);
  modalContent.appendChild(modalColumn2);
  modal.appendChild(modalContent);
  // currentDiv.appendChild(modal);
  document.body.insertBefore(modal, currentDiv);
  // end create item select modal

  // create variant modal
  const modalV = document.createElement('div');
  modalV.id = 'sbc-modal-variants';
  modalV.style.cssText = 'display: none;position: fixed;z-index: 2;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;';

  const modalContentV = document.createElement('div');
  modalContentV.id = 'sbc-modal-content-variants';
  modalContentV.style.cssText = 'background-color: #fefefe;width:100%;height:fit-content;padding-top:1px;padding-bottom:50px;margin-top:2%;position:relative;';

  const modalInnerV = document.createElement('div');
  modalInnerV.id = 'sbc-modal-content-inner-variants';
  // modalInnerV.style.cssText = 'width:80%;position:absolute;left:50%;top: 50%;-webkit-transform: translate(-50%, -50%);transform:translate(-50%, -50%);height:80%;';
  modalInnerV.style.cssText = 'width: 100%;height:100%;';

  const modalCloseButtonV = document.createElement('span');
  modalCloseButtonV.id = 'sbc-modal-close-variants';
  modalCloseButtonV.style.cssText = 'color: #333333;float: right;font-size: 50px;cursor:pointer;font-weight:200;margin-right:1%;';
  modalCloseButtonV.textContent = '×';
  modalCloseButtonV.onclick = function () {
    closeVariantModal();
  };

  modalContentV.appendChild(modalCloseButtonV);
  modalContentV.appendChild(modalInnerV);
  modalV.appendChild(modalContentV);
  // currentDiv.appendChild(modalV);
  document.body.insertBefore(modalV, currentDiv);

  // create confirm modal
  const modalC = document.createElement('div');
  modalC.id = 'sbc-modal-confirm';
  modalC.style.cssText = 'display: none;position: fixed;z-index: 3;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgba(0,0,0,0.4);';

  const modalContentC = document.createElement('div');
  modalContentC.id = 'sbc-modal-content-confirm';
  modalContentC.style.cssText = 'background-color: #fefefe;width:50%;height:fit-content;padding-top:1px;padding-bottom:50px;margin: 15% auto;position:relative;';

  const modalInnerC = document.createElement('div');
  modalInnerC.id = 'sbc-modal-content-inner-confirm';
  // modalInnerV.style.cssText = 'width:80%;position:absolute;left:50%;top: 50%;-webkit-transform: translate(-50%, -50%);transform:translate(-50%, -50%);height:80%;';
  modalInnerC.style.cssText = 'width: 100%;height:100%;';

  const modalCloseButtonC = document.createElement('span');
  modalCloseButtonC.id = 'sbc-modal-close-confirm';
  modalCloseButtonC.style.cssText = 'color: #333333;float: right;font-size: 50px;cursor:pointer;font-weight:200;margin-right:1%;';
  modalCloseButtonC.textContent = '×';
  modalCloseButtonC.onclick = function () {
    closeConfirmModal();
  };

  modalContentC.appendChild(modalCloseButtonC);
  modalContentC.appendChild(modalInnerC);
  modalC.appendChild(modalContentC);
  document.body.insertBefore(modalC, currentDiv);
})();

function loadShopify() {
  // alert('a');
  const data = {
    serial: document.currentScript.getAttribute('data-id')
  };

  sbc_global_data_id = document.currentScript.getAttribute('data-id');

  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify(data)
  };

  // const host = 'http://localhost:4040/api/app/getJustInstagramFeed';
  const host = 'https://webbackend.sandboxcommerce.com/api/app/getJustInstagramFeed';

  fetch(host, options).then((response) => { // eslint-disable-line
    return response.json();
  }).then((info) => {
    if (info.snippetStyles) {
      sbc_global_styles = info.snippetStyles;
    } else {
      sbc_global_styles = {
        foregroundColor: '#FFFFFF',
        backgroundColor: '#000000',
        ctaText: 'Shop Now',
        ctaStyle: 'button',
        storefrontCells: 5,
        landingCells: 5
      };
    }
    if (info.fullFeed) {
      // alert(info.fullFeed.length);
      sbc_global_full_ig_info = info;
      if (info.social) {
        sbc_global_facebook_url = info.social.facebookURL;
        sbc_global_twitter_url = info.social.twitterURL;
        sbc_global_pinterest_url = info.social.pinterestURL;
        sbc_global_email = info.social.email;
      }
      const size = Number(sbc_global_styles.landingCells);
      const arrayOfArrays = [];
      const pairedDownFeedArray = [];
      for (let n = 0; n < info.fullFeed.length; n ++) {
        if (info.itemsObj[info.fullFeed[n].id]) {
          if (sbc_global_styles.narrowedItemId && sbc_global_styles.displayedContentType === 'item') {
            let taggedItems = [];
            if (info.itemsObj[info.fullFeed[n].id].items) {
              taggedItems = info.itemsObj[info.fullFeed[n].id].items;
            }
            console.log('TAGGED', taggedItems);

            let foundIndex = -1;
            for (let iter = 0; iter < taggedItems.length; iter++) {
              if (taggedItems[iter].id == sbc_global_styles.narrowedItemId) {
                foundIndex = iter;
                console.log('NARROW ID ' + sbc_global_styles.narrowedItemId + ' ' + iter);
                console.log('ITEM ID ' + taggedItems[iter].id);
                console.log('ITEM NAME ' + taggedItems[iter].name);
              }
            }
            if (foundIndex > -1) {
              pairedDownFeedArray.push(info.fullFeed[n]);
            }
          } else if (sbc_global_styles.narrowedCategoryId && sbc_global_styles.displayedContentType === 'category') {

          } else {
            pairedDownFeedArray.push(info.fullFeed[n]);
          }
        }
      }
      for (let i = 0; i < pairedDownFeedArray.length; i += size) {
        arrayOfArrays.push(pairedDownFeedArray.slice(i, i + size));
      }
      sbc_global_full_image_array_array = arrayOfArrays;
      const currentArray = info.fullFeed;
      sbc_global_full_feed = currentArray;
      let bigDiv = document.createElement('div');
      bigDiv.id = 'sbc-big-div';

      let titleDiv = document.createElement('div');
      titleDiv.id = 'sbc-plus-row-div';
      let titleDivParagraph = document.createElement('p');
      titleDivParagraph.innerText = 'Shop Our Instagram';
      titleDivParagraph.style.cssText = 'height:55px;text-align:center;font-size:28px;font-weight:200;cursor:pointer;color:#333333';
      titleDiv.appendChild(titleDivParagraph);
      titleDiv.onclick = function () {
        if (info.snippetUrl) {
          window.open(info.snippetUrl);
        }
      };
      bigDiv.appendChild(titleDiv);
      // bigDiv.style.cssText = 'width:1200px';

      let rowWrapDiv = document.createElement('div');
      rowWrapDiv.id = 'sbc-low-row-wrap-div';
      rowWrapDiv.style.cssText = 'position:relative;';

      let rowDiv = document.createElement('div');
      rowDiv.id = 'sbc-long-row-div';
      rowDiv.style.cssText = 'width: 100%;overflow-x: auto;white-space: nowrap;position:relative;';
      for (let i = 0; i < currentArray.length; i++) {
        if (info.itemsObj && info.itemsObj[currentArray[i].id] && info.itemsObj[currentArray[i].id].items && info.itemsObj[currentArray[i].id].items.length) {
          let boundDiv = document.createElement('div');
          boundDiv.id = 'sbc-image-bound';
          if (size === 4) {
            boundDiv.setAttribute('class', 'image-bound-4')
          }
          if (size === 5) {
            boundDiv.setAttribute('class', 'image-bound-5')
          }
          if (size === 6) {
            boundDiv.setAttribute('class', 'image-bound-6')
          }
          // let width = '' + ((100 / size) - (0.2)) + '%';
          boundDiv.style.cssText = 'display:inline-block;margin: 0.09%;background-image:url("' + currentArray[i].media_url + '");background-repeat:no-repeat;background-size:cover;';
          boundDiv.onclick = function () {
            openModal(currentArray, i, info.itemsObj, info.shopifyStoreURL);
            // reportMetric();
            sbc_global_current_instagram_image_id = currentArray[i].id;
            reportMetric(sbc_global_current_instagram_image_id, sbc_global_data_id, 'photoClicks');
          };

          let inner = document.createElement('div');
          inner.id = 'sbc-image-inner';
          inner.style.cssText = 'width:100%;height:0;padding-top:100%;cursor:pointer;position:relative;background-color:' + sbc_global_styles.backgroundColor + ';';

          let button = document.createElement('div');
          button.id = 'sbc-image-button';
          if (sbc_global_styles.ctaStyle === 'border') {
            button.style.cssText = 'width:150px;cursor:pointer;border-style:solid;border-width:2px;border-color:' + sbc_global_styles.foregroundColor + ';position:absolute;left:50%;top: 60%;-webkit-transform: translate(-50%, -50%);transform:translate(-50%, -50%);';
          } else if (sbc_global_styles.ctaStyle === 'button') {
            button.style.cssText = 'width:150px;cursor:pointer;background-color:' + sbc_global_styles.foregroundColor + ';border-style:solid;border-width:2px;border-color:' + sbc_global_styles.foregroundColor + ';position:absolute;left:50%;top: 60%;-webkit-transform: translate(-50%, -50%);transform:translate(-50%, -50%);';
          } else if (sbc_global_styles.ctaStyle === 'underline') {
            button.style.cssText = 'width:150px;cursor:pointer;border-style:none;border-width:2px;border-color:' + sbc_global_styles.foregroundColor + ';position:absolute;left:50%;top: 60%;-webkit-transform: translate(-50%, -50%);transform:translate(-50%, -50%);';
          } else if (sbc_global_styles.ctaStyle === 'text') {
            button.style.cssText = 'width:150px;cursor:pointer;border-style:none;border-width:2px;border-color:' + sbc_global_styles.foregroundColor + ';position:absolute;left:50%;top: 60%;-webkit-transform: translate(-50%, -50%);transform:translate(-50%, -50%);';
          } else if (sbc_global_styles.ctaStyle === 'none') {
            button.style.cssText = 'visibility:hidden;width:150px;cursor:pointer;border-style:solid;border-width:2px;border-color:' + sbc_global_styles.foregroundColor + ';position:absolute;left:50%;top: 60%;-webkit-transform: translate(-50%, -50%);transform:translate(-50%, -50%);';
          }

          let instaIcon = document.createElement('i');
          instaIcon.className = 'fab fa-instagram';
          instaIcon.id = 'sbc-image-insta';
          instaIcon.style.cssText = 'width:30px;height:30px;font-size:30px;cursor:pointer;position:absolute;left:50%;top:35%;-webkit-transform: translate(-50%, -50%);transform:translate(-50%, -50%);color:' + sbc_global_styles.foregroundColor + ';';

          let buttonText = document.createElement('p');
          buttonText.textContent = sbc_global_styles.ctaText;
          buttonText.id = 'sbc-image-button-text';
          buttonText.style.cssText = 'color:' + sbc_global_styles.foregroundColor + ';width:100%;margin-top:7px;margin-bottom:7px;text-align:center;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;font-weight:600;';
          if (sbc_global_styles.ctaStyle === 'button') {
            buttonText.style.cssText = 'color:' + sbc_global_styles.backgroundColor + ';width:100%;margin-top:7px;margin-bottom:7px;text-align:center;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;font-weight:600;';
          } else if (sbc_global_styles.ctaStyle === 'underline') {
            buttonText.style.cssText = 'color:' + sbc_global_styles.foregroundColor + ';text-decoration:underline;width:100%;margin-top:7px;margin-bottom:7px;text-align:center;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;font-weight:600;';
          }

          button.appendChild(buttonText);
          inner.appendChild(button);
          inner.appendChild(instaIcon);
          boundDiv.appendChild(inner);
          rowDiv.appendChild(boundDiv);
        }
      }
      rowWrapDiv.appendChild(rowDiv);

      let scrollClickDiv = document.createElement('div');
      scrollClickDiv.id = 'sbc-scroll-click-div';
      scrollClickDiv.style.cssText = 'position:absolute;right:0;top:0;height:100%;width:50px;background-color:#eeeeee;';
      scrollClickDiv.onclick = function () {
        preSrcoll();
      };
      let scrollClickDivPara = document.createElement('p');
      scrollClickDivPara.textContent = '>';
      scrollClickDivPara.style.cssText = 'position:absolute;left:50%;top:50%;font-size:40px;-webkit-transform: translate(-50%, -50%);transform:translate(-50%, -50%);';
      scrollClickDiv.appendChild(scrollClickDivPara);
      rowWrapDiv.appendChild(scrollClickDiv);

      bigDiv.appendChild(rowWrapDiv);
      let currentDiv = document.getElementById('insert');
      currentDiv.parentNode.insertBefore(bigDiv, currentDiv);
    }
    // alert('a');
  }).catch((e) => {
    console.log('super error', e);
    // alert('b');
  });
}

function preSrcoll() {
  sbc_global_scroll_page = sbc_global_scroll_page + 1;
  // sbc_global_scroll_increment = 0;
  scrollHorizontal();
}

function scrollHorizontal() {
  const rowDiv = document.getElementById('sbc-long-row-div');
  const fullScroll = rowDiv.offsetWidth * sbc_global_scroll_page;
  sbc_global_scroll_increment += 40;
  rowDiv.scrollTo(sbc_global_scroll_increment, 0);

  if (sbc_global_scroll_increment < fullScroll) {
    setTimeout(function () {
      scrollHorizontal();
    }, 20);
  }
}

function addAnotherRow() {
  const info = sbc_global_full_ig_info;
  sbc_global_current_row = sbc_global_current_row + 1;
  // alert(sbc_global_current_row);
  if (sbc_global_full_image_array_array[sbc_global_current_row]) {
    const bigDiv = document.getElementById('sbc-big-div');
    bigDiv.removeChild(bigDiv.lastChild);
    const currentArray = sbc_global_full_image_array_array[sbc_global_current_row];
    let rowDiv = document.createElement('div');
    for (let i = 0; i < currentArray.length; i++) {
      if (info.itemsObj && info.itemsObj[currentArray[i].id] && info.itemsObj[currentArray[i].id].items && info.itemsObj[currentArray[i].id].items.length) {
        let boundDiv = document.createElement('div');
        boundDiv.id = 'sbc-image-bound';
        boundDiv.style.cssText = 'display:block;float:left;margin: 0.09%;background-image:url("' + currentArray[i].media_url + '");background-repeat:no-repeat;background-size:cover;';
        boundDiv.onclick = function () {
          openModal(currentArray, i, info.itemsObj, info.shopifyStoreURL);
          sbc_global_current_instagram_image_id = currentArray[i].id;
          reportMetric(sbc_global_current_instagram_image_id, sbc_global_data_id, 'photoClicks');
        };

        let inner = document.createElement('div');
        inner.id = 'sbc-image-inner';
        inner.style.cssText = 'width:100%;height:0;padding-top:100%;cursor:pointer;position:relative;';

        let button = document.createElement('div');
        button.id = 'sbc-image-button';
        button.style.cssText = 'width:150px;cursor:pointer;border-style:solid;border-width:2px;border-color:#ffffff;position:absolute;left:50%;top: 60%;-webkit-transform: translate(-50%, -50%);transform:translate(-50%, -50%);';

        let instaIcon = document.createElement('i');
        instaIcon.className = 'fab fa-instagram';
        instaIcon.id = 'sbc-image-insta';
        instaIcon.style.cssText = 'width:30px;height:30px;font-size:30px;cursor:pointer;position:absolute;left:50%;top:35%;-webkit-transform: translate(-50%, -50%);transform:translate(-50%, -50%);color:#FFFFFF;';

        let buttonText = document.createElement('p');
        buttonText.textContent = 'SHOP THIS LOOK';
        buttonText.id = 'sbc-image-button-text';
        buttonText.style.cssText = 'width:100%;margin-top:7px;margin-bottom:7px;text-align:center;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;font-weight:600;';

        button.appendChild(buttonText);
        inner.appendChild(button);
        inner.appendChild(instaIcon);
        boundDiv.appendChild(inner);
        rowDiv.appendChild(boundDiv);
      }
    }
    bigDiv.appendChild(rowDiv);
    if (Object.keys(info.itemsObj).length > (4 * (sbc_global_current_row + 1))) {
      // alert(sbc_global_current_row + 1 + JSON.stringify(sbc_global_full_image_array_array[sbc_global_current_row + 1]))
      let plusRowDiv = document.createElement('div');
      plusRowDiv.id = 'sbc-plus-row-div';
      let plusRowParagraph = document.createElement('p');
      plusRowParagraph.innerText = '+';
      plusRowParagraph.style.cssText = 'height:55px;text-align:center;font-size:48px;font-weight:200;cursor:pointer;';
      plusRowDiv.appendChild(plusRowParagraph);
      plusRowDiv.onclick = function () {
        addAnotherRow();
      };
      bigDiv.appendChild(plusRowDiv);
    }
  }
}

function openModal(fullArray, index, itemsObj, shopifyStoreURL) {
  const instagramObj = fullArray[index];
  const instagramObjId = instagramObj.id;
  const modal = document.getElementById('sbc-modal');
  modal.style.display = 'block';

  const modalCol1 = document.getElementById('sbc-modal-column1');
  const bigImageWrapper = document.createElement('div');
  bigImageWrapper.id = 'sbc-modal-big-image-wrapper';
  // bigImageWrapper.style.cssText = 'height:500px;width:500px;position:relative;';
  const bigImage = document.createElement('img');
  bigImage.src = instagramObj.media_url;
  bigImageWrapper.id = 'sbc-modal-big-image';
  bigImage.style.cssText = 'width:100%;';
  // modalCol1.style.backgroundImage = 'url("' + instagramObj.media_url + '")';
  // modalCol1.style.backgroundSize = 'contain';
  // modalCol1.style.backgroundRepeat = 'no-repeat';
  // modalCol1.style.backgroundPosition = 'center';
  bigImageWrapper.appendChild(bigImage);

  const modalCol2Header = document.getElementById('sbc-modal-column2-header');
  const modalNavLeftButton = document.createElement('span');
  modalNavLeftButton.id = 'sbc-modal-nav-left';
  const leftColor = fullArray[index - 1] ? '#333333' : '#aaaaaa';
  modalNavLeftButton.style.cssText = 'color:' + leftColor + ';float:left;font-size: 50px;cursor:pointer;font-weight:200;margin-right:15px;';
  modalNavLeftButton.textContent = '<';
  modalNavLeftButton.onclick = function () {
    closeModal();
    let prev = index;
    if (fullArray[index - 1]) {
      prev = index - 1;
    }
    openModal(fullArray, prev, itemsObj, shopifyStoreURL);
    sbc_global_current_instagram_image_id = fullArray[prev].id;
    reportMetric(sbc_global_current_instagram_image_id, sbc_global_data_id, 'photoClicks');
  };
  const modalNavRightButton = document.createElement('span');
  modalNavRightButton.id = 'sbc-modal-nav-right';
  const rightColor = fullArray[index + 1] ? '#333333' : '#aaaaaa';
  modalNavRightButton.style.cssText = 'color:' + rightColor + ';float: left;font-size: 50px;cursor:pointer;font-weight:200;margin-left:15px;';
  modalNavRightButton.textContent = '>';
  modalNavRightButton.onclick = function () {
    closeModal();
    let next = index;
    if (fullArray[index + 1]) {
      next = index + 1;
    }
    openModal(fullArray, next, itemsObj, shopifyStoreURL);
    sbc_global_current_instagram_image_id = fullArray[next].id;
    reportMetric(sbc_global_current_instagram_image_id, sbc_global_data_id, 'photoClicks');
  };
  modalCol2Header.appendChild(modalNavLeftButton);
  modalCol2Header.appendChild(modalNavRightButton);

  const modalItemsContainer = document.createElement('div');
  if (itemsObj[instagramObjId] && itemsObj[instagramObjId].items) {
    const size = 3;
    const arrayOfArrays = [];
    for (let i = 0; i < itemsObj[instagramObjId].items.length; i += size) {
      arrayOfArrays.push(itemsObj[instagramObjId].items.slice(i, i + size));
    }
    for (let iter = 0; iter < arrayOfArrays.length; iter++) {
      const currentArray = arrayOfArrays[iter];
      let rowDiv = document.createElement('div');
      rowDiv.style.cssText = 'width:100%;display:flex;flex-direction:row;justify-content:space-evenly';
      for (let i = 0; i < currentArray.length; i++) {
        let itemBoundDiv = document.createElement('div');
        itemBoundDiv.id = 'sbc-item-bound' + currentArray[i].id;
        if(currentArray.length===1) {
          itemBoundDiv.style.cssText = 'display:block;margin-left:auto;margin-right:auto;margin-bottom:15px;width:100%;cursor:pointer;padding:1%;border-radius:0px;vertical-align:top;';
        }
        else if(currentArray.length===2) {
          itemBoundDiv.style.cssText = 'display:block;margin-left:auto;margin-right:auto;margin-bottom:15px;width:48%;cursor:pointer;padding:1%;border-radius:0px;vertical-align:top;';
        }
        else {
          itemBoundDiv.style.cssText = 'display:block;margin-left:auto;margin-right:auto;margin-bottom:15px;width:28%;cursor:pointer;padding:1%;border-radius:0px;vertical-align:top;';
        }
        itemBoundDiv.onclick = function () {
          // const url = 'https://' + shopifyStoreURL + '/products/' + currentArray[i].handle;
          // window.open(url, '_blank');
          openVariantModal(currentArray[i], shopifyStoreURL);
        };
        let itemInnerDiv = document.createElement('div');
        itemInnerDiv.id = 'sbc-item-inner' + currentArray[i].id;
        itemInnerDiv.onmouseenter = function () {
          mouseOverItem(currentArray[i].id);
        };
        itemInnerDiv.onmouseleave = function () {
          mouseOutItem(currentArray[i].id);
        };
        let imageDiv = document.createElement('div');
        imageDiv.id = 'sbc-item-image';
        imageDiv.style.cssText = 'width:100%;height:110px;background-image:url("' + currentArray[i].images[0].src + '");background-repeat:no-repeat;background-size:contain;background-position:center;';
        let price = document.createElement('p');
        price.textContent = '$' + currentArray[i].price;
        price.style.cssText = 'text-align:center;margin-top:20px;font-size:14px;';
        let title = document.createElement('p');
        title.textContent = currentArray[i].name.toUpperCase();
        title.style.cssText = 'text-align:center;margin:0px;font-size:12px;';

        let cartButton = document.createElement('button');
        cartButton.id = 'sbc-item-cart-button';
        if(currentArray.length===1) {
          cartButton.style.cssText = 'text-align:center;margin-top:15px;margin-left:20%;margin-right:20%;font-size:11px;height:22px;width:60%;cursor:pointer;border:none;color:white;background-color:black;';
        }
        else {
          cartButton.style.cssText = 'text-align:center;margin-top:15px;font-size:9px;height:20px;width:100%;cursor:pointer;border:none;color:white;background-color:black;';
        }
        cartButton.onclick = function () {
          // const url = 'https://' + shopifyStoreURL + '/cart/' + currentArray[i].variantCartId + ':1';
          // window.open(url, '_blank');
          // openVariantModal(currentArray[i], shopifyStoreURL);
        };
        cartButton.textContent = 'ADD TO CART';
        itemInnerDiv.appendChild(imageDiv);
        itemInnerDiv.appendChild(price);
        itemInnerDiv.appendChild(title);
        itemBoundDiv.appendChild(itemInnerDiv);
        itemBoundDiv.appendChild(cartButton);
        rowDiv.appendChild(itemBoundDiv);
        // rowDiv.appendChild(cartButton);

        // item dot
        const xPos = currentArray[i].coordinates.xPercent * 100;
        const yPos = currentArray[i].coordinates.yPercent * 100;
        let itemDot = document.createElement('div');
        itemDot.id = 'sbc-item-dot' + currentArray[i].id;
        itemDot.style.cssText = 'padding-left:2px;padding-top:1px;text-align:center;opacity:0.6;cursor:pointer;position:absolute;left:' + xPos + '%;top:' + yPos + '%;height:20px;width:20px;background-color:#FFFFFF;border-radius:10px;box-shadow:0px 0px 2px 2px rgba(0, 0, 0, 0.4)';
        itemDot.onclick = function () {
          // const url = 'https://' + shopifyStoreURL + '/products/' + currentArray[i].handle;
          // window.open(url, '_blank');
          // openVariantModal(currentArray[i], shopifyStoreURL);
        };
        itemDot.onmouseenter = function () {
          mouseOverItem(currentArray[i].id);
        };
        itemDot.onmouseleave = function () {
          mouseOutItem(currentArray[i].id);
        };
        itemDot.innerText = i + 1;
        let itemDotTitle = document.createElement('div');
        itemDotTitle.id = 'sbc-item-title' + currentArray[i].id;
        const xPosT = (currentArray[i].coordinates.xPercent * 100) - 10;
        const yPosT = (currentArray[i].coordinates.yPercent * 100) + 8;
        itemDotTitle.style.cssText = 'opacity:0.0;position:absolute;left:' + xPosT + '%;top:' + yPosT + '%;background-color:#333333;color:#ffffff; text-align:center;padding:7px;';
        itemDotTitle.textContent = currentArray[i].name.toUpperCase();
        bigImageWrapper.appendChild(itemDot);
        bigImageWrapper.appendChild(itemDotTitle);
      }
      modalItemsContainer.appendChild(rowDiv);
    }
  }
  modalCol1.appendChild(bigImageWrapper);
  const modalCol2Content = document.getElementById('sbc-modal-column2-content');
  modalCol2Content.appendChild(modalItemsContainer);
  const instagramDataDiv = document.createElement('div');
  instagramDataDiv.id = 'sbc-modal-instagram-data';
  instagramDataDiv.style.cssText = 'width:100%;text-align:center;';

  let instaDescription = document.createElement('p');
  instaDescription.textContent = instagramObj.caption;
  instaDescription.style.cssText = 'text-align:center;margin:0px;font-size:14px;font-style:italic;';

  const instagramDataSpacer = document.createElement('div');
  instagramDataSpacer.style.cssText = 'height:40px;';

  let instaCreds = document.createElement('a');
  instaCreds.innerText = instagramObj.username.toUpperCase() + ' // INSTAGRAM // ' + formatDate(new Date(instagramObj.timestamp));
  // instaCreds.href = instagramObj.permalink;
  instaCreds.onclick = function() {
    window.open(instagramObj.permalink, '_blank');
    reportMetric(sbc_global_current_instagram_image_id, sbc_global_data_id, 'linkClicks');
  };
  instaCreds.id = 'sbc-modal-instagram-creds';
  instaCreds.style.cssText = 'width:100%;text-align:center;margin:0px;font-size:12px;font-style:bold;text-decoration: none;color:#000000;padding-top:15px;padding-bottom:15px;cursor:pointer;';

  let facebookIcon = document.createElement('i');
  facebookIcon.className = 'fab fa-facebook';
  facebookIcon.id = 'sbc-image-social';
  facebookIcon.style.cssText = 'width:15px;height:15px;font-size:15px;cursor:pointer;color:#000000;opacity:0.3;';

  let twitterIcon = document.createElement('i');
  twitterIcon.className = 'fab fa-twitter';
  twitterIcon.id = 'sbc-image-social';
  twitterIcon.style.cssText = 'width:15px;height:15px;font-size:15px;cursor:pointer;color:#000000;opacity:0.3;';

  let mailIcon = document.createElement('i');
  mailIcon.className = 'fa fa-envelope';
  mailIcon.id = 'sbc-image-social';
  mailIcon.style.cssText = 'width:15px;height:15px;font-size:15px;cursor:pointer;color:#000000;opacity:0.3;';

  let pinterestIcon = document.createElement('i');
  pinterestIcon.className = 'fab fa-pinterest';
  pinterestIcon.id = 'sbc-image-social';
  pinterestIcon.style.cssText = 'width:15px;height:15px;font-size:15px;cursor:pointer;color:#000000;opacity:0.3;';

  let facebookIconLink = document.createElement('a');
  facebookIconLink.href = sbc_global_facebook_url;
  facebookIconLink.appendChild(facebookIcon);

  let twitterIconLink = document.createElement('a');
  twitterIconLink.href = sbc_global_twitter_url;
  twitterIconLink.appendChild(twitterIcon);

  let mailIconLink = document.createElement('a');
  mailIconLink.href = 'mailto:' + sbc_global_email;
  mailIconLink.appendChild(mailIcon);

  let pinterestIconLink = document.createElement('a');
  pinterestIconLink.href = sbc_global_pinterest_url;
  pinterestIconLink.appendChild(pinterestIcon);

  const socialIconContainer = document.createElement('div');
  socialIconContainer.id = 'sbc-social-icons-container';
  socialIconContainer.style.cssText = 'width:100%;margin-top:15px;display:flex;flex-direction:row;justify-content:space-evenly;';
  if (sbc_global_facebook_url) {
    socialIconContainer.appendChild(facebookIconLink);
  }
  if (sbc_global_twitter_url) {
    socialIconContainer.appendChild(twitterIconLink);
  }
  if (sbc_global_pinterest_url) {
    socialIconContainer.appendChild(pinterestIconLink);
  }
  if (sbc_global_email) {
    socialIconContainer.appendChild(mailIconLink);
  }

  instagramDataDiv.appendChild(instaDescription);
  instagramDataDiv.appendChild(instagramDataSpacer);
  instagramDataDiv.appendChild(instaCreds);
  instagramDataDiv.appendChild(socialIconContainer);
  // instagramDataDiv.appendChild(instagramDataSpacer);
  modalCol2Content.appendChild(instagramDataDiv);

  // alert(modalCol1.body.style.backgroundImage);
  // background-repeat:no-repeat;background-size:contain;'
}

function closeModal() {
  const modal = document.getElementById('sbc-modal');
  modal.style.display = 'none';
  const modalCol2Header = document.getElementById('sbc-modal-column2-header');
  const modalNavLeftButton = document.getElementById('sbc-modal-nav-left');
  const modalNavRightButton = document.getElementById('sbc-modal-nav-right');
  modalCol2Header.removeChild(modalNavLeftButton);
  modalCol2Header.removeChild(modalNavRightButton);
  const modalCol2Content = document.getElementById('sbc-modal-column2-content');
  modalCol2Content.innerHTML = '';
  const modalCol1 = document.getElementById('sbc-modal-column1');
  modalCol1.innerHTML = '';
  sbc_global_current_instagram_image_id = '';
}


function openVariantModal(item, shopifyStoreURL) {
  const modal = document.getElementById('sbc-modal-variants');
  modal.style.display = 'block';
  const inner = document.getElementById('sbc-modal-content-inner-variants');

  let imageDiv = document.createElement('div');
  imageDiv.id = 'sbc-item-image-variants';
  imageDiv.style.cssText = 'width:100%;height:200px;margin-bottom:50px;margin-top:55px;background-image:url("' + item.images[0].src + '");background-repeat:no-repeat;background-size:contain;background-position:center;';

  let title = document.createElement('p');
  title.textContent = item.name.toUpperCase() + ' $' + item.price;
  title.style.cssText = 'text-align:center;margin:0px;font-size:24px;margin-bottom:20px';

  const option1Array = [];
  const option2Array = [];
  const option3Array = [];
  for (let iter = 0; iter < item.variants.length; iter++) {
    if (item.variants[iter].option1 && option1Array.indexOf(item.variants[iter].option1) === -1){
      option1Array.push(item.variants[iter].option1);
    }
    if (item.variants[iter].option2 && option2Array.indexOf(item.variants[iter].option2) === -1){
      option2Array.push(item.variants[iter].option2);
    }
    if (item.variants[iter].option3 && option3Array.indexOf(item.variants[iter].option3) === -1){
      option3Array.push(item.variants[iter].option3);
    }
  }

  sbc_global_list_full_variants = item.variants;

  let variants1List = document.createElement('div');
  variants1List.id = 'sbc-item-list-variants1';
  variants1List.style.cssText = 'width:95%;text-align:center;margin-right:auto;margin-left:auto;';

  for (let i = 0; i < option1Array.length; i++) {
    let variantDiv = document.createElement('div');
    variantDiv.id = 'sbc-variant-name-div-' + option1Array[i];
    variantDiv.style.cssText = 'cursor:pointer;display:inline-block;padding:12px;font-size:18px;background-color:#FFFFFF;border-style:solid;border-color:#333333;border-width:1px;color:#333333;margin:7px;text-align:center;';
    variantDiv.textContent = option1Array[i];
    variantDiv.onclick = function () {
      // const url = 'https://' + shopifyStoreURL + '/products/' + currentArray[i].handle;
      // window.open(url, '_blank');
      selectOption1(item.variants, i, item.images, option1Array[i], option1Array);
    };
    variants1List.appendChild(variantDiv);
  }


  let variants2List = document.createElement('div');
  variants2List.id = 'sbc-item-list-variants2';
  variants2List.style.cssText = 'width:95%;text-align:center;margin-right:auto;margin-left:auto;';

  for (let j = 0; j < option2Array.length; j++) {
    let variantDiv = document.createElement('div');
    variantDiv.id = 'sbc-variant-name-div-' + option2Array[j];
    variantDiv.style.cssText = 'cursor:pointer;display:inline-block;padding:12px;font-size:18px;background-color:#FFFFFF;border-style:solid;border-color:#333333;border-width:1px;color:#333333;margin:7px;text-align:center;';
    variantDiv.textContent = option2Array[j];
    variantDiv.onclick = function () {
      // const url = 'https://' + shopifyStoreURL + '/products/' + currentArray[i].handle;
      // window.open(url, '_blank');
      selectOption2(item.variants, j, item.images, option2Array[j], option2Array);
    };
    variants2List.appendChild(variantDiv);
  }

  let variants3List = document.createElement('div');
  variants3List.id = 'sbc-item-list-variants3';
  variants3List.style.cssText = 'width:95%;text-align:center;margin-right:auto;margin-left:auto;';

  for (let k = 0; k < option3Array.length; k++) {
    let variantDiv = document.createElement('div');
    variantDiv.id = 'sbc-variant-name-div-' + option3Array[k];
    variantDiv.style.cssText = 'cursor:pointer;display:inline-block;padding:12px;font-size:18px;background-color:#FFFFFF;border-style:solid;border-color:#333333;border-width:1px;color:#333333;margin:7px;text-align:center;';
    variantDiv.textContent = option3Array[k];
    variantDiv.onclick = function () {
      // const url = 'https://' + shopifyStoreURL + '/products/' + currentArray[i].handle;
      // window.open(url, '_blank');
      selectOption3(item.variants, k, item.images, option3Array[k], option3Array);
    };
    variants3List.appendChild(variantDiv);
  }

  let cartButtonContainer = document.createElement('div');
  cartButtonContainer.id = 'sbc-item-cart-button-container-variant';
  cartButtonContainer.style.cssText = 'width:100%;position:relative;text-align:center;margin-top: 20px;';

  let cartButton = document.createElement('button');
  cartButton.id = 'sbc-item-cart-button-variant';
  cartButton.style.cssText = 'text-align:center;font-size:24px;height:35px;width:30%;cursor:pointer;border:none;color:white;background-color:black';
  cartButton.onclick = function () {
    if (sbc_global_selected_variant) {
      // console.log(item);
      reportMetric(sbc_global_current_instagram_image_id, sbc_global_data_id, 'itemAdded');
      // const url = 'https://' + shopifyStoreURL + '/cart/' + sbc_global_selected_variant + ':1';
      // // alert(url);
      // // window.open(url, '_blank');
      // fetch(url).then(function(response) {
      //   return response.json();
      // })
      // .then(function(myJson) {
      //   closeModal();
      //   closeVariantModal();
      //   openConfirmModal(item, shopifyStoreURL);
      // }).catch(function(e){
      //   window.open(url, '_blank');
      // });
      sbc_global_cart_array.push(sbc_global_selected_variant + ':1');
      // closeModal();
      closeVariantModal();
      openConfirmModal(item, shopifyStoreURL);
    }

    // openVariantModal(currentArray[i], shopifyStoreURL);
  };
  cartButton.textContent = 'ADD TO CART';

  inner.appendChild(imageDiv);
  inner.appendChild(title);
  inner.appendChild(variants1List);
  inner.appendChild(variants2List);
  inner.appendChild(variants3List);
  cartButtonContainer.appendChild(cartButton);
  inner.appendChild(cartButtonContainer);

}

function openConfirmModal(item, shopifyStoreURL) {
  const modal = document.getElementById('sbc-modal-confirm');
  modal.style.display = 'block';
  const inner = document.getElementById('sbc-modal-content-inner-confirm');

  let notif = document.createElement('p');
  notif.textContent = 'Added To Cart';
  notif.style.cssText = 'text-align:center;margin:0px;font-size:24px;margin-bottom:20px;margin-top:55px;';

  let variantText = '';
  if (sbc_global_selected_option_1) {
    variantText += ' - ' + sbc_global_selected_option_1;
  }
  if (sbc_global_selected_option_2) {
    variantText += ' / ' + sbc_global_selected_option_2;
  }
  if (sbc_global_selected_option_3) {
    variantText += ' / ' + sbc_global_selected_option_3;
  }

  let title = document.createElement('p');
  title.textContent = item.name.toUpperCase() + variantText + ' ($' + item.price + ')';
  title.style.cssText = 'text-align:center;margin:0px;font-size:24px;margin-bottom:20px';

  let imageDiv = document.createElement('div');
  imageDiv.id = 'sbc-item-image-confirm';
  imageDiv.style.cssText = 'width:100%;height:200px;margin-bottom:20px;background-image:url("' + sbc_global_selected_variant_image_url + '");background-repeat:no-repeat;background-size:contain;background-position:center;';

  let cartButtonContainer = document.createElement('div');
  cartButtonContainer.id = 'sbc-item-cart-button-container-confirm';
  cartButtonContainer.style.cssText = 'width:100%;position:relative;text-align:center;margin-top: 20px;';

  let quantity = document.createElement('p');
  let qText = 'You have ' + sbc_global_cart_array.length;
  if (sbc_global_cart_array.length === 1) {
    qText += ' item ';
  } else {
    qText += ' items ';
  }
  qText += 'in your cart.';
  quantity.textContent = qText;
  quantity.style.cssText = 'text-align:center;margin:0px;font-size:18px;margin-bottom:20px';

  let cartButton = document.createElement('button');
  cartButton.id = 'sbc-item-cart-button-confirm';
  cartButton.style.cssText = 'text-align:center;font-size:24px;height:35px;width:50%;cursor:pointer;border:none;color:white;background-color:black';
  cartButton.onclick = function () {
    let url = 'https://' + shopifyStoreURL + '/cart/';
    for (let i = 0; i < sbc_global_cart_array.length; i++) {
      url += sbc_global_cart_array[i];
      if (i < sbc_global_cart_array.length - 1) {
        url += ','
      }
    }
    // alert(url);
    window.open(url, '_blank');
    reportMetric(sbc_global_current_instagram_image_id, sbc_global_data_id, 'cartOpened');
  };
  cartButton.textContent = 'PROCEED TO CHECKOUT';

  let continueButtonContainer = document.createElement('div');
  continueButtonContainer.id = 'sbc-item-continue-button-container-confirm';
  continueButtonContainer.style.cssText = 'width:100%;position:relative;text-align:center;margin-top: 20px;';

  let continueButton = document.createElement('button');
  continueButton.id = 'sbc-item-continue-button-confirm';
  continueButton.style.cssText = 'text-align:center;font-size:24px;height:35px;width:40%;cursor:pointer;border:none;color:white;background-color:black';
  continueButton.onclick = function () {
    closeConfirmModal();
  };
  continueButton.textContent = 'CONTINUE SHOPPING';

  inner.appendChild(notif);
  inner.appendChild(title);
  inner.appendChild(imageDiv);
  inner.appendChild(quantity);
  cartButtonContainer.appendChild(cartButton);
  inner.appendChild(cartButtonContainer);
  continueButtonContainer.appendChild(continueButton);
  inner.appendChild(continueButtonContainer);
}

function closeVariantModal() {
  const modal = document.getElementById('sbc-modal-variants');
  modal.style.display = 'none';
  const modalContent = document.getElementById('sbc-modal-content-inner-variants');
  modalContent.innerHTML = '';

  // sbc_global_selected_variant = '';
  // sbc_global_selected_variant_image = '';
  // sbc_global_list_full_variants = '';
  // sbc_global_selected_option_1 = '';
  // sbc_global_selected_option_2 = '';
  // sbc_global_selected_option_3 = '';
}

function closeConfirmModal() {
  const modal = document.getElementById('sbc-modal-confirm');
  modal.style.display = 'none';
  const modalContent = document.getElementById('sbc-modal-content-inner-confirm');
  modalContent.innerHTML = '';

  sbc_global_selected_variant = '';
  sbc_global_selected_variant_image = '';
  sbc_global_selected_variant_image_url = '';
  sbc_global_list_full_variants = '';
  sbc_global_selected_option_1 = '';
  sbc_global_selected_option_2 = '';
  sbc_global_selected_option_3 = '';
}

function selectOption1(variants, index, images, selectedOption, optionList) {
  sbc_global_selected_option_1 = selectedOption;
  selectVariant(variants, images);

  const button = document.getElementById('sbc-variant-name-div-' + selectedOption);
  button.style.backgroundColor = '#333333';
  button.style.color = '#FFFFFF';
  button.style.borderColor = '#FFFFFF';

  for (let i = 0; i < optionList.length; i++) {
    if (optionList[i] !== selectedOption) {
      const unbutton = document.getElementById('sbc-variant-name-div-' + optionList[i]);
      unbutton.style.backgroundColor = '#FFFFFF';
      unbutton.style.color = '#333333';
      unbutton.style.borderColor = '#333333';
    }
  }

}

function selectOption2(variants, index, images, selectedOption, optionList) {
  sbc_global_selected_option_2 = selectedOption;
  selectVariant(variants, images);

  const button = document.getElementById('sbc-variant-name-div-' + selectedOption);
  button.style.backgroundColor = '#333333';
  button.style.color = '#FFFFFF';
  button.style.borderColor = '#FFFFFF';

  for (let i = 0; i < optionList.length; i++) {
    if (optionList[i] !== selectedOption) {
      const unbutton = document.getElementById('sbc-variant-name-div-' + optionList[i]);
      unbutton.style.backgroundColor = '#FFFFFF';
      unbutton.style.color = '#333333';
      unbutton.style.borderColor = '#333333';
    }
  }
}

function selectOption3(variants, index, images, selectedOption, optionList) {
  sbc_global_selected_option_3 = selectedOption;
  selectVariant(variants, images);

  const button = document.getElementById('sbc-variant-name-div-' + selectedOption);
  button.style.backgroundColor = '#333333';
  button.style.color = '#FFFFFF';
  button.style.borderColor = '#FFFFFF';

  for (let i = 0; i < optionList.length; i++) {
    if (optionList[i] !== selectedOption) {
      const unbutton = document.getElementById('sbc-variant-name-div-' + optionList[i]);
      unbutton.style.backgroundColor = '#FFFFFF';
      unbutton.style.color = '#333333';
      unbutton.style.borderColor = '#333333';
    }
  }
}

function selectVariant(variants, images) {
  for (let i = 0; i < variants.length; i++) {
    if (variants[i].option1) {
      if (variants[i].option1 === sbc_global_selected_option_1) {
        if (variants[i].option2) {
          if (variants[i].option2 === sbc_global_selected_option_2) {
            if (variants[i].option3) {
              if (variants[i].option3 === sbc_global_selected_option_3) {
                sbc_global_selected_variant = variants[i].id;
                sbc_global_selected_variant_image = variants[i].image_id;
              }
            } else {
              sbc_global_selected_variant = variants[i].id;
              sbc_global_selected_variant_image = variants[i].image_id;
            }
          }
        } else {
          sbc_global_selected_variant = variants[i].id;
          sbc_global_selected_variant_image = variants[i].image_id;
        }
      }
    } else {
      sbc_global_selected_variant = variants[i].id;
      sbc_global_selected_variant_image = variants[i].image_id;
    }
  }

  if (images && images.length) {
    for (let p = 0; p < images.length; p++) {
      if (sbc_global_selected_variant_image === images[p].id) {
        const variantImage = document.getElementById('sbc-item-image-variants');
        variantImage.style.backgroundImage = 'url("' + images[p].src + '")';
        sbc_global_selected_variant_image_url = images[p].src;
      }
    }
  }
}


function formatDate(date) {
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const finalString = day + ' ' + monthNames[monthIndex] + ' ' + year;

  return finalString.toUpperCase();
}

function mouseOverItem(id) {
  // alert(id);
  const itemDot = document.getElementById('sbc-item-dot' + id);
  itemDot.style.transition = 'all.25s ease-in';
  itemDot.style.boxShadow = '0px 5px 5px 2px rgba(0, 0, 0, 0.6)';
  itemDot.style.opacity = '1';
  itemDot.classList.add('hoverEffect');
  const itemInner = document.getElementById('sbc-item-inner' + id);
  itemInner.style.transition = 'all.2s ease-in';
  itemInner.style.opacity = '0.5';
  const itemTag = document.getElementById('sbc-item-title' + id);
  itemTag.style.transition = 'all.2s ease-in';
  itemTag.style.opacity = '1';
}

function mouseOutItem(id) {
  // alert(id);
  const itemDot = document.getElementById('sbc-item-dot' + id);
  itemDot.style.transition = 'all.25s ease-in';
  itemDot.style.boxShadow = '0px 0px 2px 2px rgba(0, 0, 0, 0.4)';
  itemDot.style.opacity = '0.6';
  itemDot.classList.remove('hoverEffect');
  const itemInner = document.getElementById('sbc-item-inner' + id);
  itemInner.style.transition = 'all.2s ease-in';
  itemInner.style.opacity = '1';
  const itemTag = document.getElementById('sbc-item-title' + id);
  itemTag.style.transition = 'all.2s ease-in';
  itemTag.style.opacity = '0';
}

function reportMetric(imageId, appId, string) {
  const data = {
    imageId: imageId,
    appId: appId,
    photoClicks: 0,
    linkClicks: 0,
    cartOpened: 0,
    itemAdded: 0,
  };

  data[string] = 1;

  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify(data)
  };
  const host = 'https://webbackend.sandboxcommerce.com/api/shoppableMetrics/updateMetrics';
  // const host = 'http://localhost:4040/api/shoppableMetrics/updateMetrics';

  fetch(host, options).then((response) => { // eslint-disable-line
    return response.json();
  }).then((info) => {
    // console.log('METRIC INFO ', info);

  }).catch((e) => {
      console.log('super error', e);
    // alert('b');
  });
}
