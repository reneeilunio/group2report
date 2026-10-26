const stops=[
{city:"Rome",country:"Italy",visual:"ROME",caption:"Ancient Rome",description:"The lesson presents Ancient Rome as a culture that interacted with neighboring civilizations such as the Greeks and came of age during the Hellenistic period.",fact:"Roman artworks show a fusion of Greek and Roman culture, while Roman builders became known for grand monuments and architectural infrastructures.",artwork:"Colosseum",artist:"Ancient Roman architecture",artMark:"COLOSSEUM",observations:{idea:"Roman art is presented in the lesson as a fusion of Greek and Roman culture.",style:"The lesson highlights realism in Roman works, especially features of human beings.",context:"The Colosseum is one of the grand monuments associated with Rome's reputation as master builders."},artistName:"Ancient Rome",artistRole:"Architecture, sculpture & public culture",quote:"A culture can communicate through the spaces it builds.",bio:"The lesson describes Romans as master builders and notes their Greek influence in theatre and drama.",initials:"AR"},
{city:"Florence",country:"Italy",visual:"FLORENCE",caption:"Renaissance Italy",description:"Renaissance art emphasized the individual, naturalism, proportionality of the human body, depth, and three-dimensional perspective.",fact:"David by Michelangelo is featured in the lesson, which notes that the sculpture is 17 ft tall and weighs 12,000 lbs.",artwork:"David",artist:"Michelangelo",artMark:"DAVID",observations:{idea:"The Renaissance gave greater importance to the individual as a subject of art.",style:"The lesson highlights naturalism, proportion, depth, and three-dimensional perspective.",context:"The slide places David in Florence and notes its creation from a single block of white marble."},artistName:"Michelangelo",artistRole:"Renaissance artist",quote:"The human figure became a powerful subject for art.",bio:"The presentation features Michelangelo's David and Pietà as examples of Renaissance art.",initials:"MI"},
{city:"Ravenna",country:"Italy",visual:"RAVENNA",caption:"Romanesque / Medieval Europe",description:"The Middle Ages are presented as the period between the decline of the Roman Empire and the Renaissance, with the Church as a central authority and great cathedrals as major artistic spaces.",fact:"The lesson features the Basilica of San Vitale in Ravenna as a Romanesque cathedral.",artwork:"Basilica of San Vitale",artist:"Medieval architectural tradition",artMark:"SAN VITALE",observations:{idea:"The Church was a central figure and authority during the period.",style:"The lesson emphasizes religious illustrations, decorations, and great cathedral architecture.",context:"The Basilica of San Vitale is specifically shown in the presentation as a Romanesque cathedral."},artistName:"Medieval Europe",artistRole:"Architecture & religious art",quote:"Art can carry belief across generations.",bio:"The lesson explains that important medieval artworks were inspired by Christian scriptures and that great cathedrals were built.",initials:"ME"},
{city:"Paris",country:"France",visual:"PARIS",caption:"Impressionist France",description:"The lesson says Impressionism started in France and broke from tradition in European painting, emphasizing the immediate impression of a scene.",fact:"Communication could be seen through brushstrokes, distinctions of color, and the use of light and shadows.",artwork:"Impression, Sunrise",artist:"Claude Monet",artMark:"IMPRESSION",observations:{idea:"Impressionism emphasizes the immediate impression an artist has of an event or scene.",style:"The lesson highlights brushstrokes, color, light, and shadows.",context:"The presentation identifies Impressionism as starting in France and breaking from traditional European painting."},artistName:"Claude Monet",artistRole:"Impressionist artist",quote:"The scene can be communicated through light, color, and a momentary impression.",bio:"Claude Monet's Impression, Sunrise is one of the works featured in the presentation's Impressionism section.",initials:"CM"},
{city:"Milan",country:"Italy",visual:"MILAN",caption:"Gothic Europe",description:"The presentation uses Milan as an example of Gothic cathedral architecture through the Duomo di Milano.",fact:"The Middle Ages section identifies Gothic art as a major period and features the Duomo di Milano in Milan, Italy.",artwork:"Duomo di Milano",artist:"Gothic architectural tradition",artMark:"DUOMO",observations:{idea:"Great cathedrals were major artistic and cultural expressions of the Middle Ages.",style:"The lesson divides medieval architecture into Romanesque and Gothic periods.",context:"The Duomo di Milano is specifically shown in the presentation as a Gothic cathedral."},artistName:"Gothic Europe",artistRole:"Architecture & cultural memory",quote:"Buildings can tell stories even when no one is speaking.",bio:"The presentation places the Duomo di Milano within its discussion of Gothic cathedral architecture.",initials:"GE"}
];

let currentStop=0,visited=new Set(),quizIndex=0,quizScore=0,answered=false;
const $=id=>document.getElementById(id);
function scrollToId(id){$(id)?.scrollIntoView({behavior:"smooth"});}
function updateProgress(){const n=visited.size;$("progressText").textContent=`${n} / 5 STOPS`;$("progressBar").style.width=`${n/5*100}%`;}

function renderStop(index){
 const s=stops[index];currentStop=index;visited.add(index);updateProgress();
 $("stopNumber").textContent=`STOP ${String(index+1).padStart(2,"0")}`;
 $("stopTitle").textContent=s.city;$("stopLocation").textContent=s.country;
 $("stopDescription").textContent=s.description;$("stopFact").textContent=s.fact;
 $("artworkTitle").textContent=s.artwork;$("artworkArtist").textContent=s.artist;
 $("visualLabel").textContent=s.visual;$("visualCaption").textContent=s.caption;$("artMark").textContent=s.artMark;
 scrollToId("stop");
}

function renderArtwork(){
 const s=stops[currentStop];$("detailTitle").textContent=s.artwork;$("detailArtist").textContent=s.artist;
 $("detailDescription").textContent="This is one of the artworks or visual examples highlighted in the provided lesson. Explore the three quick observations below to connect it back to the report.";
 $("observationResult").textContent="Click an observation to reveal a short connection to the lesson.";
 document.querySelectorAll(".observation").forEach(b=>b.classList.remove("active"));scrollToId("artwork");
}

function renderArtist(){
 const s=stops[currentStop];$("artistName").textContent=s.artistName;$("artistRole").textContent=s.artistRole;
 $("artistQuote").textContent=`"${s.quote}"`;$("artistBio").textContent=s.bio;$("artistInitials").textContent=s.initials;scrollToId("artist");
}

function resetJourney(){visited=new Set();currentStop=0;updateProgress();scrollToId("home");}

$("startBtn").addEventListener("click",()=>scrollToId("map"));
document.querySelectorAll(".map-pin").forEach(pin=>pin.addEventListener("click",()=>renderStop(Number(pin.dataset.stop))));
$("artworkBtn").addEventListener("click",renderArtwork);
$("meetArtistBtn").addEventListener("click",renderArtist);
$("nextStopBtn").addEventListener("click",()=>currentStop<stops.length-1?renderStop(currentStop+1):scrollToId("map"));
document.querySelectorAll(".observation").forEach(btn=>btn.addEventListener("click",()=>{
 const s=stops[currentStop];document.querySelectorAll(".observation").forEach(b=>b.classList.remove("active"));btn.classList.add("active");$("observationResult").textContent=s.observations[btn.dataset.observation];
}));
$("backToMapBtn").addEventListener("click",()=>scrollToId("map"));



$("restartBtn").addEventListener("click",resetJourney);
updateProgress();
