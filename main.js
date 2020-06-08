const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let Img = new Image();
let fileName = '';

const downloadBtn = document.getElementById('download-btn');
const uploadFile = document.getElementById('upload-file');
const revertBtn = document.getElementById('revert-btn');

//ADD FILTERS AND EFFECTS
//We used event deligation here instead of putting event listener on all buttons
document.addEventListener('click', (e) => {
    //if whatever is clicked has a filter-btn
    if(e.target.classList.contains('filter-btn')) {
        if(e.target.classList.contains('brightness-add')){
            Caman('#canvas', img, function() {
                this.brightness(5).render();
            });
        } else if(e.target.classList.contains('brightness-remove')) {
            Caman('#canvas', img, function() {
                this.brightness(-5).render();
            });
        }  else if(e.target.classList.contains('contrast-add')) {
            Caman('#canvas', img, function() {
                this.contrast(5).render();
            });
        } else if(e.target.classList.contains('contrast-remove')) {
            Caman('#canvas', img, function() {
                this.contrast(-5).render();
            });
        } else if(e.target.classList.contains('saturation-add')) {
            Caman('#canvas', img, function() {
                this.saturation(5).render();
            });
        } else if(e.target.classList.contains('saturation-remove')) {
            Caman('#canvas', img, function() {
                this.saturation(-5).render();
            });
        } else if(e.target.classList.contains('vibrance-add')) {
            Caman('#canvas', img, function() {
                this.vibrance(5).render();
            });
        } else if(e.target.classList.contains('vibrance-remove')) {
            Caman('#canvas', img, function() {
                this.vibrance(-5).render();
            });
            //EFFECT
        } else if(e.target.classList.contains('vintage-add')) {
            Caman('#canvas', img, function() {
                this.vintage().render();
            });
        }   else if(e.target.classList.contains('lomo-add')) {
            Caman('#canvas', img, function() {
                this.lomo().render();
            });
        }   else if(e.target.classList.contains('clarity-add')) {
            Caman('#canvas', img, function() {
                this.clarity().render();
            });
        }   else if(e.target.classList.contains('sincity-add')) {
            Caman('#canvas', img, function() {
                this.sinCity().render();
            });
        }   else if(e.target.classList.contains('crossprocess-add')) {
            Caman('#canvas', img, function() {
                this.crossProcess().render();
            });
        }   else if(e.target.classList.contains('pinhole-add')) {
            Caman('#canvas', img, function() {
                this.pinhole().render();
            });
        }   else if(e.target.classList.contains('nostalgia-add')) {
            Caman('#canvas', img, function() {
                this.nostalgia().render();
            });
        }   else if(e.target.classList.contains('hermajesty-add')) {
            Caman('#canvas', img, function() {
                this.herMajesty(-5).render();
            });
        }     
    }
});

//Revert Filters
revertBtn.addEventListener('click', (e) => {
    Caman('#canvas', img, function () {
        this.revert();
    })
})


//UPLOAD FILE
uploadFile.addEventListener('change', (e) => {
    //Get File
    const file = document.getElementById('upload-file')
    .files[0];

    //Init FileReader
    const reader = new FileReader();

    if(file) {
        //Set file name
        fileName = file.name;
        //Read data as URL
        reader.readAsDataURL(file)
    }

    //Add Image to Canvas
    reader.addEventListener('load', () => {
        //Create Image
        img = new Image();
        //Set src
        img.src = reader.result;
        //On Image Load, add to canvas
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.removeAttribute('data-caman-id');
        }
    }, false)
})


//Download Event
downloadBtn.addEventListener('click', (e) => {
    //Get file extension
    const fileExtension = fileName.slice(-4);

    //Initialize a new filename
    let newFileName;

    //Check image type
    if(fileExtension === '.jpg' || fileExtension === '.png') {
        //remove the extension off file name
        newFileName =fileName.substring(0, fileName.lenghth - 4) + '-edited.jpg';
    }

    //Call Download
    download(canvas, newFileName);
})

    //Download function
    function download( canvas, filename) {
        //Initialize event
        let e;
        //Create link
        const link = document.createElement('a');

        //Set properties
        link.download = filename;
        link.href = canvas.toDataURL('image/jpeg', 0.8);
        e = new MouseEvent('click');
        //Dispatch event
        link.dispatchEvent(e)
    }