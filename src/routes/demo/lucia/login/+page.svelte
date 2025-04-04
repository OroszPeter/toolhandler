<script >
	import { enhance } from '$app/forms';
	let { form } = $props();
	let login = $state(true);
</script>
{#if login}
	<button onclick={() => login = false}
	class="ui red button">Regisztráció</button>
	<h1>Bejelentkezés</h1>
{:else}
	<button onclick={() => login = true} 
	class="ui blue button">Bejelentkezés</button>
	<h1>Regisztrációs űrlap</h1>
{/if}
<form method='post' action='?/login' use:enhance>
	<div class="ui input">
		<div class="ui label">Felhasználónév</div>
		<input name='username' />
	</div>
	<div class="ui divider"></div>
	{#if !login}
		<div class="ui input">
			<div class="ui label">Név</div>
			<input type='text' name='name' />
		</div>
		<div class="ui divider"></div>
	{/if}
	<div class="ui input">
		<div class="ui label">Jelszó</div>
		<input type='password' name='password' />
	</div>
	<div class="ui divider"></div>
	<div>
		{#if login}
			<button class="ui blue button">Bejelentkezés</button>
		{:else}
			<button class="ui red button" formaction='?/register'>Regisztráció</button>
		{/if}
	</div>
</form>
<p style='color: red'>{form?.message ?? ''}</p>
<style>
	form {
		border: solid 4px gray;
		border-radius: 10px;
		padding: 20px;
		display: inline-flex;
		flex-direction: column;
		background-color: rgb(210, 227, 231);
	}
</style>