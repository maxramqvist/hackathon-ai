import { Client, Connection } from '@temporalio/client';
import { nanoid } from 'nanoid';

import { TASK_QUEUE_NAME } from './shared';
import { sortNotesWorkflow } from './workflows';

async function run() {
  const connection = await Connection.connect({
    address: process.env.TEMPORAL_ADDRESS,
    tls: process.env.TEMPORAL_TLS === 'true',
    apiKey: process.env.TEMPORAL_API_KEY,
  });

  const client = new Client({
    connection,
    namespace: process.env.TEMPORAL_NAMESPACE,
  });

  const handle = await client.workflow.start(sortNotesWorkflow, {
    taskQueue: TASK_QUEUE_NAME,
    args: [
      [
        `明天阅读欧洲史；后天阅读全球史；完全学会游泳；学会日语；学会滑雪；学会下国际象棋
Muscle contraction and relaxation.
CNS send s signal through a motor neuron towards a skeletal muscle.
Signal travels along the axon and reaches the axon terminal at the neuromuscular junction.
This signal triggers the voltage-gated Ca2+ channel on the membrane of the neuron opens, the Ca ions diffuses from extracellular space into the cytoplasm. This triggers the vesicles inside the neuron to release ACh into the synaptic cleft, which is a small gap between the neuron and the sarcolemma.
	•		4.	And ACh binds with the receptors on sarcolemma, which opens the sodium ions channel. And then sodium ions go inside the muscle cell and cause a new action potential.
糖类
单糖monosaccharides： 葡萄糖glucose，果糖fructose，半乳糖galactose
Rings or chains
聚合物polymer formation
双糖Disaccharides：蔗糖sucrose(葡萄糖+果糖），乳糖lactose（葡萄糖+半乳糖）
多糖polysaccharide：肝糖glycogen，淀粉starch，纤维素cellulose`,
        `Imorn är det hackathonet 17.00 till sent och massa prepp innan. Så jag börjar nog min dag runt lunch och fokuserar på prepp inför hackathonet. Sen tänkte jag kompa lite fredag och ta ledigt på måndag (fsk stängd).
Så mergar och skickar ut när jag har några timmar att rätta ev grejer som kommer upp.

You, Yesterday 7:36 PM, Edited
Ah jag kunde ju inte hålla mej så nu satt jag här och bankade huvudet mot typescript compilern ett tag till.
Kikade på om nuvarande kod skulle publicera cli:t korrekt, vilket den inte gjorde pga att platform-api imports saknades.

Löste en del av det men det kräver att man reffar kompilerad api kod, och därmed blir dx dåligt. Man måste ha api:t kompilerat och om man gör "Go to reference" i cli:t till en typ i api:t så landar man då på kompilerad js. Usch. Alla förändringar kräver också omkompilering av api:t om man ska reffa dem från cli:t.
Har en riktigt äcklig lösning som kör sed för att ändra i api/package.json. Då lirar allt utom pre-commit-hookarna.

Så nära.
`,
        `coffee intake → maybe too high? jittery mornings vs. calm focus afternoons
deadlines = stacking up faster than tasks getting cleared… need triage system
"done is better than perfect" but then perfectionist loop kicks in → contradiction
interesting that some people listen to white noise vs. others classical vs. silence — is it about personality type?
memory anchors: smell of rain on asphalt → childhood → bikes + scraped knees
note: look up “dopamine fasting” again — hype vs. science?
read somewhere: language shapes perception — Sapir-Whorf? strong vs. weak hypothesis, need to re-check
chaotic desk → creative chaos? or just procrastination disguised as “organized mess”
idea for writing: "cities are living organisms" — streets = veins, people = blood cells
books piling up unread… should I try “just-in-time reading” instead of “just-in-case reading”?
water > coffee → hydration = underrated productivity hack
interesting paradox: technology makes things easier → people end up busier
half-thought: Is boredom necessary for creativity? Without it, do ideas dry up?
random: bananas are berries but strawberries aren’t?? taxonomy is weird
music looped = focus booster or distraction amplifier depending on mood
to-do: explore Roam Research / Obsidian again, backlinks felt promising
ancient philosophy note: Stoics = practice voluntary discomfort → build resilience
need more walking without headphones → let thoughts wander
random curiosity: why do cats purr? not only happiness, also self-healing vibrations?
note-to-self: schedule dentist. Stop delaying.
economy → cycles of boom & bust → same human psychology repeating in different clothes
dreams: always forget them unless I write within 3 minutes → maybe keep notebook by bed
interesting: deep work requires boredom tolerance → phone kills that
should explore "digital gardens" → publishing as learning
reminder: posture! back pain creeping in
thought: success often ≠ effort, but effort × leverage × timing
habit stacking works but only if anchor habit is rock solid
question: what if attention span is the new currency? Feels true.
quote (half-remembered): "We don’t rise to level of goals, we fall to level of systems."





`,
      ],
    ],
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'planner-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
