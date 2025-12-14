# Research: Gamification + Psychology (Notes)

This doc summarizes the most useful (and generally accepted) findings/frameworks behind gamification and loyalty design.
It’s written to be **actionable** for Lumelle product decisions.

## 1) What “gamification” is (and isn’t)

**Gamification** is commonly defined as using **game design elements** in **non-game contexts** to influence engagement and behavior.

Practical translation:
- Not “turning everything into a game”
- It’s adding **progress**, **feedback**, **goals**, and **rewards** to make desired actions feel more motivating and clear

Key source:
- Deterding et al. (2011) – “From game design elements to gamefulness: defining gamification.”

## 2) Does gamification work?

Evidence is mixed but generally suggests gamification can improve:
- engagement (usage frequency/time)
- motivation (especially when aligned with intrinsic motives)
- learning/completion in structured flows

It can also fail when:
- it feels manipulative
- rewards are confusing/unfair
- mechanics don’t match user intent

Key source:
- Hamari, Koivisto & Sarsa (2014) – systematic review of empirical gamification studies.

## 3) Self‑Determination Theory (SDT): the “why” behind engagement

SDT says motivation strengthens when experiences support:
- **Autonomy**: I feel in control / choosing
- **Competence**: I feel capable / progressing
- **Relatedness**: I feel connected / seen

How this maps to Lumelle:
- Autonomy: let users choose rewards (don’t force a single path)
- Competence: show “you’re close” (progress bars, next milestone)
- Relatedness: celebrate creators/customers publicly (spotlights, community wins)

Key source:
- Deci & Ryan (2000) – SDT needs framework.

## 4) Behavior design: motivation × ability × prompt

Even motivated users fail if:
- the action is too hard (low ability)
- or they’re not prompted at the right moment

Practical checklist for any gamified action:
- **Make the action easy** (one tap, auto-applied, no forms)
- **Prompt at the right time** (post-purchase, after checkout, after delivery)
- **Show immediate feedback** (“+120 points earned”)

Key source:
- Fogg (2009) – Behavior Model for persuasive design.

## 5) Loyalty program psychology: progress beats value

In loyalty systems, people respond strongly to:

### Goal‑gradient effect (effort increases near a goal)
When users feel close to a reward, they accelerate behavior to “finish”.

Design implications:
- Always show “points to next reward”
- Make the next goal visible and attainable
- Use milestones (e.g., 200 → 500 → 1000 points)

### Endowed progress (“head start” feels motivating)
Giving a small starter boost can increase completion rates because users feel already “on the way”.

Design implications:
- Give new users a small starting balance (e.g., 100–200 points)
- Show progress UI immediately (don’t hide until later)

Key source:
- Kivetz, Urminsky & Zheng (2006) – goal gradient + illusionary/endowed progress in loyalty programs.

## 6) Reinforcement schedules (use with care)

Variable rewards (unpredictable bonuses) can be highly engaging, but they can also:
- feel like gambling
- erode trust if not transparent

Recommendation for Lumelle:
- Prefer **transparent bonuses** (“double points weekend”, “bonus for 2-pack”) vs random rewards
- If you do “surprise & delight”, keep it occasional and framed as gratitude, not “spin the wheel”

### Note on “spin wheels”

If a UI looks random (a wheel) but the outcome is deterministic, users will (eventually) notice.
That can harm trust and can also create legal/policy issues depending on jurisdiction and platform.

If you want the fun of the animation but a guaranteed outcome, label it honestly:
- “Claim your reward” / “Unlock your reward”
- or make every segment identical so it’s truthfully guaranteed

## 7) Ethics: “engaging” without being exploitative

Guardrails that keep long-term trust:
- **Transparency**: how points are earned, what they’re worth, when they expire
- **Fairness**: refunds/returns reverse points; no hidden gotchas
- **No dark patterns**: avoid deceptive countdowns or loot-box style mechanics
- **Respect attention**: don’t spam; prompt only at high-intent moments

## References (starter list)

- Deterding, S., Dixon, D., Khaled, R., & Nacke, L. (2011). *From game design elements to gamefulness: defining “gamification”.* MindTrek.
  - https://dl.acm.org/doi/10.1145/2181037.2181040
- Hamari, J., Koivisto, J., & Sarsa, H. (2014). *Does Gamification Work? – A Literature Review of Empirical Studies on Gamification.* HICSS.
  - https://www.researchgate.net/publication/260947998_Does_Gamification_Work_-_A_Literature_Review_of_Empirical_Studies_on_Gamification
- Deci, E. L., & Ryan, R. M. (2000). *The “what” and “why” of goal pursuits: Human needs and the self-determination of behavior.* Psychological Inquiry.
  - https://selfdeterminationtheory.org/SDT/documents/2000_DeciRyan_PIWhatWhy.pdf
- Fogg, B. J. (2009). *A behavior model for persuasive design.* Persuasive ’09.
  - https://dl.acm.org/doi/10.1145/1541948.1541999
- Kivetz, R., Urminsky, O., & Zheng, Y. (2006). *The Goal-Gradient Hypothesis Resurrected: Purchase Acceleration, Illusionary Goal Progress, and Customer Retention.* Journal of Marketing Research.
  - https://doi.org/10.1509/jmkr.43.1.39
