import Heading from "../../components/Heading"

export const metadata = {
  title: "About",
}

const About = () => {
  return (
    <>
      <Heading title="About" />
      <p>
        In the early 2000s, you would need a large studio to create a game; good
        computers were still very expensive and not as commonplace as they are
        today. Thanks to technology getting cheaper, the equipment needed to
        make a game is in most homes today. Thanks to this, when someone wants
        to make a game, they no longer need a large budget or a huge team.
        Instead, a shoestring budget and a small team are more than enough to
        create a great game, with some even going at it alone and creating an
        entire game single-handedly.
      </p>
      <p className="pt-3">
        Today, indie games are bigger than ever with hundreds coming out every
        year, all with a unique spin. Creativity is alive and well in the game
        industry thanks to the indie scene. Over the past couple of generations,
        we have seen a wealth of great indie games, with these being the stand
        outs.
      </p>
    </>
  )
}

export default About
