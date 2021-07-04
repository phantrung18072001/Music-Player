/* 
    - Render ra danh sach bai hat OK
    - Handle keo xuong thi cd size giam dan {lay vi tri} OK
    - Set first song OK
    - Play/pause/seek OK
    - cd rotate OK
    - next/prev OK
    - random songs OK
    - next/repeat songs when ended OK
    - active song OK
    - scroll active song into view OK
    - play song when click OK
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('.playlist');
const cd = $('.cd');
const songThumb = $('.cd-thumb');
const songHeading = $('.dashboard header h2')
const songAudio = $('#audio');
const btnPlay = $('.btn-toggle-play')
const player = $('.player');
const progress = $('.progress');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const btnRandom = $('.btn-random');
const btnRepeat = $('.btn-repeat');

const ms = 1000;

const app = {
    songs: [
        {
        name: 'Nevada',
        singer: 'Vicetone',
        path: 'https://aredir.nixcdn.com/NhacCuaTui924/Nevada-Vicetone-4494556.mp3?st=_IjpS9u0LjapNgzm058wVw&e=1623143773',
        image: 'https://i.pinimg.com/originals/f8/6f/33/f86f3378e656883b33594f06d78d1634.jpg',
        },
        {
        name: 'Light It Up',
        singer: 'Robin Hustin x TobiMorrow',
        path: 'https://aredir.nixcdn.com/NhacCuaTui968/LightItUp-RobinHustinTobimorrowJex-5619031.mp3?st=kzpVQ5kKnf2LlcAqM6lnxg&e=1623143881',
        image: 'https://avatar-ex-swe.nixcdn.com/song/2019/01/08/1/3/d/a/1546913843457_640.jpg',
        },
        {
        name: 'Yoru ni kakeru',
        singer: 'YOASOBI',
        path: 'https://aredir.nixcdn.com/NhacCuaTui992/YoruNiKakeru-YOASOBI-6149490.mp3?st=68hnFhtGF6RukKDcDcW9Mw&e=1623132179',
        image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/16788ee5-3436-474a-84fd-6616063a1a9a/de2f4eq-bc67fa17-8dae-46a9-b85d-fe8082c34841.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2Nzg4ZWU1LTM0MzYtNDc0YS04NGZkLTY2MTYwNjNhMWE5YVwvZGUyZjRlcS1iYzY3ZmExNy04ZGFlLTQ2YTktYjg1ZC1mZTgwODJjMzQ4NDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dABuqANeQEs6FBfslZHdG1lW_gDwzf61yqiSABROSx0',
        },
        {
        name: 'Muộn rồi mà sao còn',
        singer: 'Sơn Tùng M-TP',
        path: 'https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624',
        image: 'https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg',
        },
        {
        name: 'See You Again',
        singer: 'Charlie Puth ft Wiz Khalifa',
        path: 'https://aredir.nixcdn.com/NhacCuaTui894/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3?st=1q73myBS8FKr8Rx0snpMJw&e=1623144094',
        image: 'https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg',
        },
        {
        name: 'Shape of You',
        singer: 'Ed Sheeran',
        path: 'https://aredir.nixcdn.com/NhacCuaTui945/ShapeOfYou-AlexGootAndieCase-5076956.mp3?st=9I9Z2TBGWNOnQRfIJDomDA&e=1623138210',
        image: 'https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/09/a0/64/09a0641c-e5fa-407e-9829-47702358ec72/190295819972.jpg/1200x1200bf-60.jpg',
        }
        ,
        {
        name: 'Symphony',
        singer: 'Clean Bandit',
        path: 'https://aredir.nixcdn.com/Sony_Audio37/Symphony-CleanBanditZaraLarsson-4822950.mp3?st=sPgJSXtRXYpT_rznXyez6g&e=1623144426',
        image: 'https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg',
        },
        {
        name: 'Waiting For Love',
        singer: 'Avicii',
        path: 'https://aredir.nixcdn.com/Unv_Audio45/WaitingForLove-Avicii-4203283.mp3?st=mXGv6kIqbxg_coAyUqzlnw&e=1623144462',
        image: 'https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg',
        },
        {
        name: 'Alone',
        singer: 'Marshmello',
        path: 'https://aredir.nixcdn.com/NhacCuaTui927/Alone-Marshmello-4456939.mp3?st=RTsMC9tNcKEi8fd0iKtdaA&e=1623144502',
        image: 'https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg',
        },
        {
        name: 'Something Just Like This',
        singer: 'The Chainsmokers & Coldplay',
        path: 'https://aredir.nixcdn.com/Sony_Audio39/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3?st=VQuH6VgNsPlBizbk-c7n3w&e=1623144556',
        image: 'https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg',
        },
        {
        name: 'Sugar',
        singer: 'Maroon 5',
        path: 'https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=3FUWEyikJePPeAuREUcw9g&e=1623144644',
        image: 'https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg',
        },
    ],
    curIndex: 0,    
    isPlaying: false,
    arrayTemp: [],
    count: 0,
    defineProperties: function(){
        Object.defineProperty(this,'curSong',{
            get: function(){
                return this.songs[this.curIndex];
            }
        })
    },

    loadCurSong: function() {
        songHeading.innerText = this.curSong.name;
        songThumb.style.backgroundImage = `url('${this.curSong.image}')`;
        songAudio.src = this.curSong.path;
        if ($('.song.active')) {
            $('.song.active').classList.remove('active');
        }
        const list = $$('.song');
        list.forEach((song) => {
            console.log(song.dataset.index,this.curIndex);
            if (song.dataset.index == this.curIndex) {
                song.classList.add('active');
            }
        });
        this.scrollToActiveSong();
    },

    scrollToActiveSong: function() {
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        },300)
    },

    nextSong: function() {
        if(btnRandom.classList.contains('active')){
            this.randomSong();
        } else {
            this.curIndex++;
            if(this.curIndex > this.songs.length-1) {
                this.curIndex = 0;
            }
        }
        this.loadCurSong();
    },

    prevSong: function() {
        if(btnRandom.classList.contains('active')){
            this.randomSong();
        } else {
            this.curIndex--;
            if(this.curIndex < 0) {
                this.curIndex = this.songs.length-1;
            }
        }
        this.loadCurSong();
    },

    //btn random song
    randomSong: function() {
        let newIndex;
        let isRepeat;
        do{
            newIndex = Math.floor(Math.random() * this.songs.length);
            isRepeat = this.arrayTemp.includes(newIndex);
        } while(isRepeat == true);
        this.arrayTemp[this.count] = newIndex;
        this.curIndex = newIndex;
        this.loadCurSong();
        this.count++;
        if(this.count == this.songs.length){
            this.count = 0;
            this.arrayTemp = [];
        }
    },
    
    // Xử lý các sự kiện
    handle: function(){
        const _this = this;
        let cdWidth = cd.offsetWidth; 
        // NOTE: let a = songAudio.duration; => NaN khi audio khong chay => add audio.play()

        // resize cd thumb
        document.onscroll = function(){
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            let newWidth = cdWidth - scrollTop;
            if(newWidth <= 0) {
                newWidth = 0;
            }
            cd.style.width = newWidth + 'px';
            cd.style.opacity = newWidth / cdWidth;
        }
        
        // songthumb animation
        const songThumbRotate = songThumb.animate([{transform: 'rotate(360deg)'}],{duration: 10000,iterations: Infinity});
        songThumbRotate.pause();

        // handle btn play 
        btnPlay.onclick = function(){
            if(_this.isPlaying){
                songAudio.pause();
            } else {
                songAudio.play();
            }
        }

        //play song
        songAudio.onplay = function(){
            player.classList.add('playing');
            _this.isPlaying = true;
            songThumbRotate.play();
        }

        // pause song
        songAudio.onpause = function(){
            player.classList.remove('playing');
            _this.isPlaying = false;
            songThumbRotate.pause();
        }

        songAudio.ontimeupdate = function(){
            if(songAudio.duration){
                progress.value = songAudio.currentTime / songAudio.duration * 100;
            }
        }

        // seek chưa làm được: khi giữ chuột thì bài hát vẫn tiếp tục, khi thả chuột thì ms update curTime
        progress.oninput = function(e){
            songAudio.currentTime = e.target.value / 100 * songAudio.duration;
            songAudio.play();
        }

        // next song 
        btnNext.onclick = function(){
            _this.nextSong();
            songAudio.play()
                .catch((e)=>{
                    songAudio.pause();
                })
        }

        //prev song
        btnPrev.onclick = function(){
            _this.prevSong();
            songAudio.play()
                .catch((e)=>{
                    songAudio.pause();
                })
        }

        //random song
        btnRandom.onclick = function(){
            btnRandom.classList.toggle('active');
            // c1: sử dụng 1 biến isRandom
            // c2: sử dụng classList.contains         
        }

        // khi bai hat ket thuc
        songAudio.onended = function(){
            if(btnRepeat.classList.contains('active')){
                songAudio.play();
            } else {
                _this.nextSong();
                songAudio.play();
            }
        }

        // repeat btn
        btnRepeat.onclick = function(){
            btnRepeat.classList.toggle('active');
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function(e){
            let songNode = e.target.closest('.song:not(.active)')
            if(songNode && !e.target.closest('.option')){
                _this.curIndex = songNode.dataset.index;
                _this.loadCurSong();
                songAudio.play();
            }

        }
    },

    render: function() {
        const htmlsongs = this.songs.map((song,index) =>{
            return `
            <div data-index="${index}" class="song ${index === this.curIndex ? 'active' : ''}">
                <div class="thumb" style="background-image: url('${song.image}')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmlsongs.join('');
    },

    start: function() {
        this.defineProperties();
        this.loadCurSong();
        this.handle();
        this.render();
    },
}
app.start();


