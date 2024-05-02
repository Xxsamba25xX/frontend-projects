<script lang="ts">
	let filter = $state(0);
	let todos = $state([
		{
			text: 'tarea1',
			done: false
		},
		{
			text: 'tarea2',
			done: true
		}
	]);

	function addEvent(keyDown: KeyboardEvent) {
		if (keyDown.key !== 'Enter') {
			return;
		}

		let target = keyDown.target as HTMLInputElement;
		let text = target.value;
		todos = [...todos, { text: text, done: false }];
		target.value = '';
	}

	let actualTodos = $derived.by(() => {
		if (filter === 0) {
			return todos;
		}

		if (filter === -1) {
			return todos.filter((item) => !item.done);
		}

		return todos.filter((item) => item.done);
	});
</script>

<div class="grid justify-center">
	<input
		class="pl-2 border-b-2 border-gray-200 m-2 outline-none"
		type="text"
		onkeydown={addEvent}
	/>
	{#each actualTodos as todo, i}
		<div class="todo m-1 border-2 p-2 rounded border-gray-200">
			<input class="outline-none" type="text" bind:value={actualTodos[i].text} />
			<input class="outline-none" type="checkbox" bind:checked={actualTodos[i].done} />
		</div>
	{/each}
	<div class="grid grid-flow-col gap-x-3 justify-center">
		<button class="border-2 p-2 rounded boder-gray-200" onclick={() => (filter = 0)}>full</button>
		<button class="border-2 p-2 rounded boder-gray-200" onclick={() => (filter = -1)}>left</button>
		<button class="border-2 p-2 rounded boder-gray-200" onclick={() => (filter = 1)}>
			completed</button
		>
	</div>
</div>

<style>
	* {
		font-size: medium;
	}
</style>
