export const distributeAmount = (amount, cards) => {
    const sorted = [...cards].sort((a, b) => b.totalDue - a.totalDue);
    const results = [];
    let remaining = amount;
  
    // Pay minimum dues first
    for (let card of sorted) {
      const pay = Math.min(card.minimumDue, remaining);
      results.push({ cardId: card._id, amountPaid: pay });
      remaining -= pay;
    }
  
    // Pay remaining based on max totalDue
    for (let card of sorted) {
      const alreadyPaid = results.find(r => r.cardId.equals(card._id)).amountPaid;
      const extraDue = card.totalDue - alreadyPaid;
      const pay = Math.min(extraDue, remaining);
      results.find(r => r.cardId.equals(card._id)).amountPaid += pay;
      remaining -= pay;
    }
  
    return results;
  };