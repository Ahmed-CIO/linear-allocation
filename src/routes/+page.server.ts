import { LinearClient } from '@linear/sdk';

import { LINEAR_API_KEY } from '../.config';

const linearClient = new LinearClient({
	apiKey: LINEAR_API_KEY
});

const fetchAllocationData = async () => {
	const teams = await linearClient.teams();

	type CIOTeam = {
		name: string;
		planned: {
			percentage: string;
			count: number;
		};
		unplanned: {
			percentage: string;
			count: number;
		};
		total: number;
	};

	const cioTeams: CIOTeam[] = [];

	for (const teamId in teams.nodes) {
		const teamNode = teams.nodes[teamId];
		const team: CIOTeam = {
			name: teamNode.name,
			planned: {
				percentage: '',
				count: 0
			},
			unplanned: {
				percentage: '0',
				count: 0
			},
			total: 0
		};

		team.total = (
			await teamNode.issues({
				filter: {
					updatedAt: {
						gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
					},
					state: {
						name: {
							neq: 'notstarted'
						}
					}
				}
			})
		).nodes.length;
		team.planned.count = (
			await teamNode.issues({
				filter: {
					or: [
						{
							labels: {
								name: {
									eq: 'planned'
								}
							}
						},
						{
							project: {
								null: false
							}
						}
					],
					updatedAt: {
						gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
					},
					state: {
						name: {
							neq: 'notstarted'
						}
					}
				}
			})
		).nodes.length;

		team.unplanned.count = (
			await teamNode.issues({
				filter: {
					updatedAt: {
						gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
					},
					state: {
						name: {
							neq: 'notstarted'
						}
					},
					labels: {
						name: {
							neq: 'planned'
						}
					},
					project: {
						null: true
					}
				}
			})
		).nodes.length;

		team.planned.percentage = (
			team.total > 0 ? (team.planned.count / team.total) * 100 : 0
		).toFixed(2);
		team.unplanned.percentage = (
			team.total > 0 ? (team.unplanned.count / team.total) * 100 : 0
		).toFixed(2);

		cioTeams.push(team);
	}
	cioTeams.sort((a, b) => b.name.localeCompare(a.name));
	return {
		teams: cioTeams
	};
};

export const load = async () => {
	return await fetchAllocationData();
};
