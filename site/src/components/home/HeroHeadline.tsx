// The hero headline: React Bits BlurText, by words with an 80 ms stagger, once. The <h1> itself is animated and
// carries the full sentence as its name. Under reduced motion, without JavaScript, or if the script is slow, CSS
// shows the words as they are (site.css .blur-text rules).
import BlurText from '../bits/BlurText';
import { site } from '../../content/site';

export default function HeroHeadline() {
  const breakAfter = site.headlineLines[0].split(' ').length - 1;
  return (
    <BlurText
      as="h1"
      text={site.headline}
      animateBy="words"
      delay={80}
      direction="top"
      breakAfter={[breakAfter]}
      breakClassName="max-md:hidden"
      className="hero-title justify-center"
    />
  );
}
