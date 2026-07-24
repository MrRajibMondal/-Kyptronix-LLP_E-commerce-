import { useState } from 'react'

const EMPTY = {
  fullName: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  pincode: '',
  type: 'Home'
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat', 'Haryana',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha',
  'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal'
]

export default function AddressForm({ initial, onSubmit, submitLabel = 'Continue to payment' }) {
  const [form, setForm] = useState({ ...EMPTY, ...initial })
  const [errors, setErrors] = useState({})

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Enter the recipient\u2019s name.'
    if (!/^[0-9]{10}$/.test(form.phone.trim())) next.phone = 'Enter a 10-digit phone number.'
    if (!form.line1.trim()) next.line1 = 'Enter the address.'
    if (!form.city.trim()) next.city = 'Enter a city.'
    if (!form.state.trim()) next.state = 'Select a state.'
    if (!/^[0-9]{6}$/.test(form.pincode.trim())) next.pincode = 'Enter a 6-digit PIN code.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (validate()) onSubmit(form)
  }

  return (
    <form className="address-form" onSubmit={handleSubmit} noValidate>
      <div className="address-type-row">
        {['Home', 'Work', 'Other'].map((t) => (
          <button
            type="button"
            key={t}
            className={`address-type-chip${form.type === t ? ' active' : ''}`}
            onClick={() => update('type', t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="form-grid">
        <label className="form-field">
          <span>Full name</span>
          <input value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="e.g. Raj Bhatt" />
          {errors.fullName && <em>{errors.fullName}</em>}
        </label>

        <label className="form-field">
          <span>Phone number</span>
          <input
            value={form.phone}
            onChange={(e) => update('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="10-digit mobile number"
            inputMode="numeric"
          />
          {errors.phone && <em>{errors.phone}</em>}
        </label>

        <label className="form-field form-field-wide">
          <span>Address line 1</span>
          <input value={form.line1} onChange={(e) => update('line1', e.target.value)} placeholder="Flat, house no., building, street" />
          {errors.line1 && <em>{errors.line1}</em>}
        </label>

        <label className="form-field form-field-wide">
          <span>Address line 2 (optional)</span>
          <input value={form.line2} onChange={(e) => update('line2', e.target.value)} placeholder="Area, landmark" />
        </label>

        <label className="form-field">
          <span>City</span>
          <input value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="e.g. Kolkata" />
          {errors.city && <em>{errors.city}</em>}
        </label>

        <label className="form-field">
          <span>State</span>
          <select value={form.state} onChange={(e) => update('state', e.target.value)}>
            <option value="">Select state</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.state && <em>{errors.state}</em>}
        </label>

        <label className="form-field">
          <span>PIN code</span>
          <input
            value={form.pincode}
            onChange={(e) => update('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="6-digit PIN"
            inputMode="numeric"
          />
          {errors.pincode && <em>{errors.pincode}</em>}
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        {submitLabel}
      </button>
    </form>
  )
}
