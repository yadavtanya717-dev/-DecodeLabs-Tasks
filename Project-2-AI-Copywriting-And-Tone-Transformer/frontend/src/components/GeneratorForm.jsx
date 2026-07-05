import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { BsMagic } from "react-icons/bs";
import { generateCopy } from "../services/api";

const PLATFORMS = ["Instagram", "LinkedIn", "Facebook", "Email"];
const TONES = ["Professional", "Luxury", "Friendly", "Persuasive", "Humorous"];

const initialFormState = {
  product_name: "",
  product_description: "",
  platform: "",
  tone: "",
  temperature: 0.7,
  top_p: 0.9,
};

const GeneratorForm = ({ setGeneratedCopy, isLoading, setIsLoading }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSliderChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: parseFloat(e.target.value) }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.product_name.trim()) {
      newErrors.product_name = "Product name is required.";
    }

    if (!formData.product_description.trim()) {
      newErrors.product_description = "Product description is required.";
    } else if (formData.product_description.trim().length < 10) {
      newErrors.product_description =
        "Please add a bit more detail (min. 10 characters).";
    }

    if (!formData.platform) {
      newErrors.platform = "Select a target platform.";
    }

    if (!formData.tone) {
      newErrors.tone = "Select a tone.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setApiError("");

  if (!validate()) return;

  setIsLoading(true);
  setGeneratedCopy("");

  try {
    const result = await generateCopy(formData);

    console.log("API RESPONSE:", result);

    // ✅ DIRECT AND CLEAN (NO EXTRA CONDITIONS)
    if (result?.text) {
      setGeneratedCopy(result.text);
    } else {
      setGeneratedCopy(JSON.stringify(result));
    }

  } catch (error) {
    console.error("API ERROR:", error);
    setApiError(
      error?.response?.data?.detail ||
      error.message ||
      "Something went wrong"
    );
  } finally {
    setIsLoading(false);
  }
};

  const handleClearForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setApiError("");
  };

  return (
    <motion.form
      className="panel generator-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="panel__header">
        <span className="panel__icon">
          <HiOutlineSquares2X2 />
        </span>
        <div>
          <h2 className="panel__title">Copy Generator</h2>
          <p className="panel__subtitle">
            Describe your product, pick a tone, and let the model do the rest.
          </p>
        </div>
      </div>

      {/* PRODUCT NAME */}
      <div className="field">
        <label className="field__label">Product Name</label>
        <input
          type="text"
          className={`field__input ${errors.product_name ? "field__input--error" : ""}`}
          value={formData.product_name}
          onChange={handleChange("product_name")}
          placeholder="e.g. Aurora Leather Weekender Bag"
        />
        {errors.product_name && (
          <span className="field__error">{errors.product_name}</span>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="field">
        <label className="field__label">Product Description</label>
        <textarea
          rows={4}
          className={`field__input field__textarea ${
            errors.product_description ? "field__input--error" : ""
          }`}
          value={formData.product_description}
          onChange={handleChange("product_description")}
          placeholder="Describe materials, features, and what makes this product stand out..."
        />
        {errors.product_description && (
          <span className="field__error">{errors.product_description}</span>
        )}
      </div>

      {/* PLATFORM + TONE */}
      <div className="field-row">
        <div className="field">
          <label className="field__label">Platform</label>
          <select
            className={`field__input field__select ${
              errors.platform ? "field__input--error" : ""
            }`}
            value={formData.platform}
            onChange={handleChange("platform")}
          >
            <option value="">Select platform</option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.platform && (
            <span className="field__error">{errors.platform}</span>
          )}
        </div>

        <div className="field">
          <label className="field__label">Tone</label>
          <select
            className={`field__input field__select ${
              errors.tone ? "field__input--error" : ""
            }`}
            value={formData.tone}
            onChange={handleChange("tone")}
          >
            <option value="">Select tone</option>
            {TONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.tone && (
            <span className="field__error">{errors.tone}</span>
          )}
        </div>
      </div>
      
      {/* TEMPERATURE + TOP-P */}
      <div className="field-row">
        <div className="field">
          <div className="field__label-row">
            <label className="field__label">Temperature</label>
            <span className="field__value-badge">
              {formData.temperature.toFixed(2)}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={formData.temperature}
            onChange={handleSliderChange("temperature")}
            className="field__slider"
          />

          <div className="field__slider-labels">
            <span>Focused</span>
            <span>Creative</span>
          </div>
        </div>

        <div className="field">
          <div className="field__label-row">
            <label className="field__label">Top-P</label>
            <span className="field__value-badge">
              {formData.top_p.toFixed(2)}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={formData.top_p}
            onChange={handleSliderChange("top_p")}
            className="field__slider"
          />

          <div className="field__slider-labels">
            <span>Narrow</span>
            <span>Diverse</span>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <AnimatePresence>
        {apiError && (
          <motion.div
            className="form-alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {apiError}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="generator-form__actions">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={handleClearForm}
          disabled={isLoading}
        >
          Clear
        </button>

        <button type="submit" className="btn btn--primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner" />
              Generating...
            </>
          ) : (
            <>
              <BsMagic />
              Generate Copy
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
};

export default GeneratorForm;