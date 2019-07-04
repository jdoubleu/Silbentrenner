<script>
	import Editor from './components/Editor.svelte';
	import ColorSelect from './components/ColorSelect.svelte';
	import Hyphenator from './lib/Hyphenator.js';
	import debounce from 'lodash/debounce';

	const outputPlaceholder = '<span style="color: #bcbcbc;">Ausgabe</span>';

	let colors,
		input,
		output = outputPlaceholder;

	const h = new Hyphenator(colors);
	const debounceOutput = debounce(hyphenateOutput, 400);

	$: {
		h.colors = colors;
		debounceOutput(input);
	}

	function hyphenateOutput(value) {
		output = value ? h.colorizeText(value) : outputPlaceholder;
	}

	function handleOutputClick(e) {
		const target = e.target

		// select text in element
		const range = document.createRange()
		range.selectNode(target)
		window.getSelection().addRange(range)
	}
</script>

<div id="app">
	<header>
		<h1>Silbentrenner</h1>
		<span>language: <a href="https://github.com/jdoubleu/Silbentrenner#language">german</a></span>
		<ColorSelect bind:value={colors}/>
		<a href="https://github.com/jdoubleu/Silbentrenner">source code</a>
	</header>
	<main>
		<Editor bind:value={input}/>
		<div on:click={handleOutputClick}>{@html output}</div>
	</main>
</div>

