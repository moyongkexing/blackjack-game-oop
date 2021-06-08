import { Card } from "./Card";

export class Dealer {
  public type: string = "DEALER";
  public name: string = "Dealer";
  public hand: Card[] = [];
  public status: "bust" | "blackjack" | "stand" | "initial" = "initial";
  public isTurnEnd: boolean = false;

  public get openCard(): Card {
    return this.hand[0];
  }

  public get handScore(): number {
    let score = 0;
    for (let card of this.hand) score += card.rankNum;
    // If score is over 21, subtract 10 if there is an ace in one's hand(switch the rank from 11 to 1).
    let i = this.NumAce;
    while (score > 21 && i > 0) {
      score -= 10;
      i--;
    }
    return score;
  }
  
  private get NumAce(): number {
    return this.hand.filter((card) => card.rank === "A").length;
  }

  public get isBlackjack(): boolean {
    return this.handScore === 21 && this.NumAce > 0;
  }

  public getCard(card: Card): void {
    this.hand.push(card);
    if(this.hand.length === 2 && this.isBlackjack) {
      this.status = "blackjack";
      this.isTurnEnd = true;
    } 
  }

  public stand(): void {
    this.status = "stand";
    this.isTurnEnd = true;
  }

  public hit(card: Card): void {
    this.getCard(card);
    if(this.handScore > 16) {
      this.status = "stand";
      this.isTurnEnd = true;
    }
    if(this.handScore > 21) this.status = "bust";
  }
  
  public resetState(): void {
    this.hand = [];
    this.status = "initial";
    this.isTurnEnd = false;
  }
}
