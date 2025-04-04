<script>
    const { data } = $props()
    let user = $state(data.user)
</script>
<h1>Céges eszköz-nyilvántartó program</h1>
{#if user}
    <p>Bejelentkezve: {user.name}</p>
{:else}
    <a href="/demo/lucia">Bejelentkezés</a>
{/if}