import React from "react";

export default function About() {
  return (
    <section>
      <h2>An gamified pomodoro timer to help you be more productive</h2>

      <article>
        <h3>What is Pomoquest?</h3>
        <p>
          Pomoquest is a customizable web-based pomodoro timer that works on all
          browsers. Target demographic: students, knowledge workers,
          perfectionists, or anyone who just likes to get stuff done.
        </p>
      </article>

      <article>
        <h3>What is the Pomodoro Technique?</h3>
        <p>
          The Pomodoro Technique is a time management method developed by
          Francesco Cirillo. It provides a structured approach to work and
          study, enhancing productivity and focus. The technique involves
          breaking down tasks into intervals, typically 25 minutes in length,
          called "pomodoros". Each pomodoro is followed by a short break. The
          name "pomodoro" originates from the Italian word for 'tomato,'
          inspired by the tomato-shaped kitchen timer Cirillo used as a
          university student.
        </p>
      </article>

      <article>
        <h3>How to use the Pomodoro Timer?</h3>
        <ol>
          <li>Select a task to focus on</li>
          <li>
            Start the pomodoro timer and concentrate on the task for its
            duration
          </li>
          <li>
            Take a short break when the alarm rings (completion of a pomodoro +
            break is 1 cycle)
          </li>
          <li>After 3 or 4 cycles, take a long break. (usually 15 minutes)</li>
          <li>Repeat process until you finish your tasks.</li>
        </ol>
      </article>

      <article>
        <h3>Features</h3>
        <ul>
          <li>
            Gamify your productivity: Earn coins based on the successful
            completion of any timer (1 coin per minute)
          </li>
          <p>
            You can utilize the earned coins to unlock new background colors for
            the site, allowing you to customize your Pomodoro Timer experience.
          </p>
          <li>Custom Timers: Personalize your focus/break time.</li>
          <li>
            Upcoming Features: More Custom Settings, change alarm sound,
            productivity report charts.
          </li>
        </ul>
      </article>
    </section>
  );
}
