# Tennis Calculator

The approach here is more object oriented with the introduction of entities to represent the possible objects in a tennis tournament. The user's input to supply a file and query the results is more procedural and functional based.

## Run the app

```shell
npm install
npm run build
node dist/index.js
```

You'll be prompted to enter a file (example):
```shell
Enter the tournament file: data/full_tournament.txt
```
You can continuously query the results (example):
```shell
Enter your query: Score Match 2
```
```shell
Person C defeated Person A
2 sets to 1
```
```shell
Enter your query: Games Player Person C
```
```shell
17 11
```

## Run the tests

```
npm test
```

## Assumptions

- Only 1 tournament will exist
- The tournament file is correctly formatted
- The scores in the file are complete to determine a winner for a match
- The user is going to exactly type in the queries the way they should be with just case-sensitivity support
- There is only 2 queries the user can make, otherwise the logic should be handled in a better way, like perhaps using a design pattern to make it extendible and easier to maintain

## Improvements

- Encapsulate `Match` object into `Tournament` object, especially if we wanting to support more than one tournament
- Better error handling, and throwing exceptions where necessary
- Procedural and functional logic in handling the user's input can be converted to be more object-oriented
- Supporting user's mistakes in typing and formatting of queries
