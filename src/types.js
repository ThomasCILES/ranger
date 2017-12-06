const SCRIPTS    = {
    name : "scripts",
    types: [
        'mysql', 'js', 'sh', 'php', 'c', 'scss', 'sass', 'less', 'stylus', 'html', 'h', 'cpp', 'jsx', 'vue', 'json', 'css', 'rb', 'gitignore'
    ]
};
const DOCUMENTS  = {
    name : "documents",
    types: [
        'doc', 'docx', 'xls', 'xlsx', 'odt', 'pdf', 'txt'
    ]
};
const IMAGES     = {
    name : "images",
    types: [
        'jpg', 'png', 'jpeg', 'tiff', 'gif', 'webm'
    ]
};
const VIDEOS     = {
    name : "videos",
    types: [
    'mp4', 'mkv'
    ]
};
const MUSICS     = {
    name : "musics",
    types: [
        'ogg', 'mp3', 'wav'
    ]
};
const ARCHIVES   = {
    name : "archives",
    types: [
        'zip', 'rar', 'gz', 'tar', '7z'
    ]
};
const INSTALLERS = {
    name : "installers",
    types: [
        'deb'
    ]
};
const OTHERS     = {
    name : "others",
    types: []
};

module.exports   = {DOCUMENTS, IMAGES, MUSICS, VIDEOS, SCRIPTS, ARCHIVES, INSTALLERS, OTHERS};