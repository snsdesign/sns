/* Native modal supplies focus containment, Escape and background inertness. */
document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.querySelector('.ant-lightbox');
    const links = [...document.querySelectorAll('[data-ant-lightbox]')];
    if (!dialog || !links.length || typeof dialog.showModal !== 'function') return;
    const image = dialog.querySelector('img');
    const caption = dialog.querySelector('figcaption');
    let index = 0, opener, previousOverflow;
    const show = (next) => {
        index = (next + links.length) % links.length;
        const source = links[index].querySelector('img');
        image.src = links[index].href;
        image.alt = source.alt;
        caption.textContent = `${index + 1} / ${links.length} — ${source.alt}`;
    };
    links.forEach((link, i) => link.addEventListener('click', event => {
        event.preventDefault();opener = link;show(i);
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';dialog.showModal();
        dialog.querySelector('[data-ant-close]').focus();
    }));
    dialog.querySelector('[data-ant-close]').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-ant-prev]').addEventListener('click', () => show(index - 1));
    dialog.querySelector('[data-ant-next]').addEventListener('click', () => show(index + 1));
    dialog.addEventListener('keydown', event => {
        if(event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();show(index + (event.key === 'ArrowRight' ? 1 : -1));
        }
    });
    dialog.addEventListener('click', event => {if(event.target === dialog) dialog.close();});
    dialog.addEventListener('close', () => {
        document.body.style.overflow = previousOverflow;
        image.removeAttribute('src');opener?.focus({preventScroll:true});
    });
});
