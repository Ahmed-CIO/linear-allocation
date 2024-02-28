import { LinearClient } from '@linear/sdk';

import { LINEAR_API_KEY } from '.config';

// Api key authentication
const client1 = new LinearClient({
	apiKey: LINEAR_API_KEY
});

export const getPlannedVSUnplannedIssuesPerTeam = async () => {
	const teams = await client1.teams();
	console.log(teams);

	for (const teamName in teams.nodes) {
		const team = teams.nodes[teamName];
		const teamIssues = await team.issues();
		console.log(teamIssues);
		const plannedIssues = teamIssues.nodes.filter((issue) => issue.labelIds.includes('planned'));
		const unplannedIssues = teamIssues.nodes.filter((issue) =>
			issue.labelIds.includes('unplanned')
		);
		console.log(
			`Team: ${team.name} has ${plannedIssues.length} planned issues and ${unplannedIssues.length} unplanned issues`
		);
	}
};
