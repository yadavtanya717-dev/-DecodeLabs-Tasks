import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineDocumentText, HiOutlineClipboard, HiOutlineCheck } from "react-icons/hi2";
import { HiOutlineDownload, HiOutlineTrash } from "react-icons/hi";

const OutputCard = ({ generatedCopy, isLoading, onClear }) => {
  const [copied, setCopied] = useState(false);

  const content = generatedCopy;

  const stats = useMemo(() => {
    const text = generatedCopy || "";
    const trimmed = text.trim();
    const words = trimmed.length ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    return { words, characters, readingTime };
  }, [generatedCopy]);

  const handleCopy = async () => {
    if (!generatedCopy) return;
    try {
      await navigator.clipboard.writeText(generatedCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleDownload = () => {
    if (!generatedCopy) return;
    const blob = new Blob([generatedCopy], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated-copy.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (onClear) onClear();
  };

  return (
    <motion.div
      className="panel output-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
    >
      <div className="panel__header">
        <span className="panel__icon">
          <HiOutlineDocumentText />
        </span>
        <div>
          <h2 className="panel__title">Generated Copy</h2>
          <p className="panel__subtitle">
            Your tone-matched marketing copy will appear here.
          </p>
        </div>
      </div>

      <div className="output-card__body">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              className="output-card__loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="spinner spinner--lg" />
              <p>Crafting your copy...</p>
            </motion.div>
          ) : content ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="output-card__text"
            >
              {content}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="output-card__empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HiOutlineDocumentText className="output-card__empty-icon" />
              <p>Fill in the form and generate your first draft.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {content && !isLoading && (
        <>
          <div className="output-card__stats">
            <div className="stat-chip">
              <span className="stat-chip__value">{stats.words}</span>
              <span className="stat-chip__label">Words</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip__value">{stats.characters}</span>
              <span className="stat-chip__label">Characters</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip__value">{stats.readingTime}m</span>
              <span className="stat-chip__label">Reading Time</span>
            </div>
          </div>

          <div className="output-card__actions">
            <button className="btn btn--ghost" onClick={handleCopy}>
              {copied ? <HiOutlineCheck /> : <HiOutlineClipboard />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button className="btn btn--ghost" onClick={handleDownload}>
              <HiOutlineDownload />
              Download .txt
            </button>
            <button className="btn btn--ghost btn--danger" onClick={handleClear}>
              <HiOutlineTrash />
              Clear
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default OutputCard;
