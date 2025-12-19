document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(btn.dataset.page).style.display = 'block';
        btn.classList.add('active');
    };
});

document.getElementById('run').onclick = async () => {
    const out = document.getElementById('out');
    const tag = document.getElementById('tag').value;
    const key = document.getElementById('key').value;
    const start = Date.now();
    
    out.innerText = "// Connecting to Edge Node...";
    try {
        const res = await fetch(`/api/hashtag?tag=${tag}&apikey=${key}`);
        const data = await res.json();
        document.getElementById('time').innerText = `(${Date.now() - start}ms)`;
        out.innerText = JSON.stringify(data, null, 2);
    } catch (e) { out.innerText = "// CONNECTION_ERROR"; }
};
