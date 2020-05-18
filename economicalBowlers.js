function economicalBowler(matches, deliveries) {

    const match_ids = {};

    for( let match of matches ) {
        const id = match.id;
        const year = match.season;
        if(match_ids[year]) {
            match_ids[year].push(id);
        } else {
            match_ids[year] = [];
            match_ids[year].push(id);
        }
    }

    // console.log(match_ids)

    const economicBowlers = {};

    // // getting the balls and runs by each bowler
    for(let delivery of deliveries) {
        const match_id = delivery.match_id;
        const total_runs = parseInt(delivery.total_runs);
        const extra_runs = parseInt(delivery.extra_runs);
        const bowler = delivery.bowler;
        for(let year in match_ids) {
            if(match_ids[year].includes(match_id)) {
                if(economicBowlers[year]) {
                    if(economicBowlers[year][bowler]) {
                        economicBowlers[year][bowler]['runs'] += total_runs;
                        economicBowlers[year][bowler]['balls'] += 1;
                        if(extra_runs) economicBowlers[year][bowler]['balls'] -= 1;
                    } else {
                        economicBowlers[year][bowler] = {};
                        economicBowlers[year][bowler]['runs'] = total_runs;
                        economicBowlers[year][bowler]['balls'] = 1;
                        if(extra_runs) economicBowlers[year][bowler]['balls'] -= 1;
                    }
                } else {
                    economicBowlers[year] = {};                    
                }
            }
        }
    }

    // console.log(economicBowlers);

    const totalEconomics = {};

    // // calculating the economy for each bowler
    for(let year in economicBowlers) {
        for(let bowler in economicBowlers[year]) {
            const runs = economicBowlers[year][bowler].runs;
            const overs = economicBowlers[year][bowler].balls/6;
            const economy = (runs/overs).toFixed(2);
            if(totalEconomics[year]) {
                totalEconomics[year].push({ bowler, economy })
            } else {
                totalEconomics[year] = [];
                totalEconomics[year].push({ bowler, economy })
            }
        }
    }

    // console.log(totalEconomics);

    const finalResult = {};

    for(let year in totalEconomics) {
        if(finalResult[year]) {
            finalResult[year] = totalEconomics[year].sort((a,b) => parseFloat(a.economy) - parseFloat(b.economy)).slice(0,10);
        } else {
            finalResult[year] = [];
            finalResult[year] = totalEconomics[year].sort((a,b) => parseFloat(a.economy) - parseFloat(b.economy)).slice(0,10);
        }
    }

    // console.log(finalResult);
    return finalResult;
}

module.exports = economicalBowler;