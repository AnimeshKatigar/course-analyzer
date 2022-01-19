function ContainsAny(str) {
  const string = str.toLowerCase();
  let count = 0;
  let badCount = 0;
  let goodCount = 0;

  const goodItems = [
    "good",
    "best",
    "complete",
    "recommended",
    "perfect",
    "important",
    "useful",
    "interesting",
    "knowledgable",
    "well done",
    "excellent",
    "helpful",
    "very",
    "positive",
    "interactive",
    "exciting",
    "not bad",
    "new",
    "latest",
    "enjoyed",
    "enjoyed a lot",
    "well organized",
    "well organised",
    "focused",
    "recommend",
    "nice explanation",
    "concise",
    "meaningful",
  ];
  const badItems = [
    "bad",
    "incorrect",
    "incomplete",
    "invalid",
    "missing",
    "wrong",
    "boring",
    "complicated",
    "not helpful",
    "uninteresting",
    "unengaging",
    "unpassionate",
    "waste",
    "unnecessary",
    "waste of money",
    "waste of time",
    "irrelevant",
    "frustration",
    "frustating",
    "confusion",
    "confusing",
    "not good",
    "not good enough",
    "not correct",
    "not recommended",
    "outdated",
    "old",
    "not using",
    "disappointment",
    "disappointing",
    "flaw",
    "very disappointing",
  ];
  for (var i in badItems) {
    var item = badItems[i];
    if (string.indexOf(item) > -1) {
      count--;
      badCount++;
    }
    if (10 > badCount > 5) {
      count = count - 2;
    }
    if (badCount > 9) {
      count = count - 5;
    }
  }
  for (var j in goodItems) {
    var k = goodItems[j];
    if (string.indexOf(k) > -1) {
      count++;
    }
  }
  if (10 > goodCount > 5) {
    count = count + 2;
  }
  if (goodCount > 9) {
    count = count + 5;
  }
  console.log("count", count);
  return count;
}

export const recommendReviewHelper = (reviews) => {
  var points = 0;
  if (!reviews || reviews.length === 0) {
    points = 0;
  } else {
    points = reviews.map((review) => {
      let revPoint = ContainsAny(review.review);
      points = points + revPoint;
      //   review.review.includes();
    });
  }
  return points;
};
