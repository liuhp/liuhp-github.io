{% if aplayer.enabled %}
  <!-- require APlayer -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css">
  <script src="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js"></script>
  <!-- require MetingJS -->
  <script src="https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js"></script>
  <meting-js
    server="netease"
    type="playlist"
    fixed="true"
    id="3099335800"
    auto="true"
    mini="true"
    autoplay="true"
    theme="#607d8b"
    loop="all"
    order="random"
    preload="auto"
    volume="0.5"
    mutex="true"
    list-folded="true"
    list-max-height="340px"
    storage-name="metingjs" >
  </meting-js>
{% endif %}