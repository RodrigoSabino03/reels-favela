import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const isHomePage = document.querySelector(".page.home-page");
  if (!isHomePage) return;

  const grid = document.querySelector(".social-feed-grid");
  if (!grid) return;

  fetch("/data/social.json")
    .then((res) => res.json())
    .then((posts) => {
      posts.forEach((post) => {
        const card = document.createElement("a");
        card.href = post.link;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        card.className = "social-card";

        const caption =
          post.caption.length > 80
            ? post.caption.slice(0, 77) + "..."
            : post.caption;

        card.innerHTML = `
          <img
            class="social-card-thumb"
            src="${post.thumbnail}"
            alt="${caption}"
            loading="lazy"
          />
          <div class="social-card-body">
            <span class="social-card-badge ${post.platform}">${post.platform}</span>
            <p class="social-card-caption">${caption}</p>
          </div>
        `;

        grid.appendChild(card);
      });

      initAnimations();
    })
    .catch((err) => {
      console.error("Failed to load social feed:", err);
    });
});

function initAnimations() {
  const cards = document.querySelectorAll(".social-card");
  if (!cards.length) return;

  gsap.set(cards, { opacity: 0, y: 40 });

  ScrollTrigger.batch(cards, {
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15,
      });
    },
    start: "top 90%",
    once: true,
  });
}
