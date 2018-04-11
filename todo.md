    "autoprefixerBrowsers": [
      "Android 2.3",
      "Android >= 4",
      "Chrome >= 20",
      "Firefox >= 24",
      "Explorer >= 8",
      "iOS >= 6",
      "Opera >= 12",
      "Safari >= 6"
    ]

git reset --hard 7f39b808e3168d9aa328d8c940d5b9836ee57426

git push --force

git commit --amend --no-edit


gulp delete:dist

gulp copy:fonts-images
gulp copy:bootstrap
gulp copy:dependencies
gulp copy:.htaccess

gulp compile:styles
gulp compile:scripts
gulp compile:bootstrap-plugins
gulp compile:bootstrap
gulp minify:html-php
gulp minify:json
gulp minify:bootstrap

--------------------------------------------
ā á ǎ à
ē é ě è
ī í ǐ ì
ō ó ǒ ò
  ú ǔ ù ǚ

,
    {
        "character": "這",
        "pinyin": "zhè",
        "meaning": "that",
        "category": "composed",
        "lesson": 2,
        "dialoge": 1
    }



    missing ones

{
    "character": ["高", "文", "中"],
    "pinyin": "Gāo Wénzhōng",
    "meaning": "(a personal name)",
    "lesson": 2,
    "dialogue": 1
},
{
    "character": ["白", "英", "愛"],
    "pinyin": "báiyīngài",
    "meaning": "(a personal name)",
    "lesson": 2,
    "dialogue": 2
},
{
    "character": ["大", "學", "生"],
    "pinyin": "dàxuéshēng",
    "meaning": "college student",
    "lesson": 2,
    "dialogue": 2
}


<!--
<div class="row">
    <div class="col-md-12">
        <span>Study collection:</span>

        <form action="#" class="flashcard__choice">
            <div class="checkbox">
                <label class="checkbox-inline">
                    <input type="checkbox" id="inlineCheckbox1" value="all" checked>All
                </label>
                <label class="checkbox-inline">
                    <input type="checkbox" id="inlineCheckbox2" value="radical">Radicals
                </label>
                <label class="checkbox-inline">
                    <input type="checkbox" id="inlineCheckbox3" value="number">Numbers
                </label>
                <label class="checkbox-inline">
                    <input type="checkbox" id="inlineCheckbox3" value="composed">Composed
                </label>
            </div>
        </form>
    </div>
</div> -->


<!-- <div class="row">
    <div id="study">
        <div class="col-md-4">
            <h2>Write the character and pinying for the following</h2>
            <div id="quiz"></div>
        </div>
        <div class="col-md-4">
            <h2>review the following</h2>
            <did id="review"></did>
        </div>
        <div class="col-md-4">
            <h2>Study the following</h2>
            <did id="learn"></did>
        </div>
        <div class="col-md-12">
            <h2>Study and review</h2>
            <div id="cha"></div>
        </div>

        <div class="col-md-12">
            <h2>Full list</h2>
            <div id="list"></div>
        </div>
    </div>
</div> -->
