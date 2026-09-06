export function scrollToId(id, { offset = 96 } = {}) {
  const el = document.getElementById(String(id).replace("#", ""));
  if (!el) return;

  const top =
    el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
}

export function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
