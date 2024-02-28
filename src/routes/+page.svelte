<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data);
</script>

<h1>CIO Engineering Allocation</h1>
<table>
	<thead>
		<tr>
			<th>Team</th>
			<th>Total issues in the last 7 days</th>
			<th>Planned issues</th>
			<th>Unplanned issues</th>
		</tr>
	</thead>
	<tbody>
		{#each data.teams as team (team.name)}
			<tr>
				<td>{team.name}</td>
				<td>{team.total}</td>
				<td>{team.planned.count} ({team.planned.percentage}%)</td>
				<td>{team.unplanned.count} ({team.unplanned.percentage}%)</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
	}
	th,
	td {
		text-align: center;
		padding: 10px;
		border: 1px solid #000;
	}
</style>
