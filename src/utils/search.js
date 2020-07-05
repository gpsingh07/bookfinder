const dataSet = require('./data.json');
const data = dataSet.summaries;

const checkSubstirng = function(str, query){
	const index = str.indexOf(query);
	const endpoint = index + query.length;

	if(index === -1)
		return 3;
	if((index === 0 || str[index-1] === ' ') && (endpoint === str.length || str[endpoint] === ' '))
		return 0;
	if(index === 0 || str[index-1] === ' ' || endpoint === str.length || str[endpoint] === ' ')
		return 1;
	return 2;
}	

const search = function({list, query, count}){
	let searchIndexes = {};
	const searchString = query.trim();
	for(let i=0; i<list.length; i++){
		const fullSearch = checkSubstirng(list[i].toLowerCase(), searchString);
		if(fullSearch < 3){
			searchIndexes[fullSearch] = searchIndexes[fullSearch] ? [...searchIndexes[fullSearch], i] : [i];
		}else{
			const words = searchString.split(' ').filter(word => word.length);
			let semiSearch = 0;
			for(let j=0; j<words.length; j++){
				const temp = checkSubstirng(list[i].toLowerCase(), words[j]);
					semiSearch += temp;
			}
			searchIndexes[semiSearch] = searchIndexes[semiSearch] ? [...searchIndexes[semiSearch], i] : [i];
		}
	}
	console.log(searchIndexes);
	console.log(Object.values(searchIndexes).flat());
	return Object.values(searchIndexes).flat().slice(0,count);
}

export default search;