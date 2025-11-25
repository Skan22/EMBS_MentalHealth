import { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { useBloomStore } from '../store/useBloomStore';
import type { SkinTone, HairStyle, HairColor } from '../types/store.types';
import { Avatar } from './Avatar';

interface AvatarCustomizerProps {
    isOpen: boolean;
    onClose: () => void;
}

const skinTones: { value: SkinTone; label: string; color: string }[] = [
    { value: 'light', label: 'Light', color: '#FFE0BD' },
    { value: 'medium', label: 'Medium', color: '#F1C27D' },
    { value: 'tan', label: 'Tan', color: '#C68642' },
    { value: 'dark', label: 'Dark', color: '#8D5524' },
];

const hairStyles: { value: HairStyle; label: string }[] = [
    { value: 'short', label: 'Short' },
    { value: 'long', label: 'Long' },
    { value: 'curly', label: 'Curly' },
    { value: 'bun', label: 'Bun' },
    { value: 'ponytail', label: 'Ponytail' },
];

const hairColors: { value: HairColor; label: string; color: string }[] = [
    { value: 'brown', label: 'Brown', color: '#6F4E37' },
    { value: 'blonde', label: 'Blonde', color: '#F4D03F' },
    { value: 'black', label: 'Black', color: '#2C2C2C' },
    { value: 'red', label: 'Red', color: '#C1440E' },
    { value: 'blue', label: 'Blue', color: '#3498DB' },
    { value: 'pink', label: 'Pink', color: '#E91E63' },
];

export const AvatarCustomizer = ({ isOpen, onClose }: AvatarCustomizerProps) => {
    const { avatar, updateAvatar, stage } = useBloomStore();
    const [tempAvatar, setTempAvatar] = useState(avatar);

    const handleSave = () => {
        updateAvatar(tempAvatar);
        onClose();
    };

    const handleCancel = () => {
        setTempAvatar(avatar);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCancel} title="Customize Your Avatar" size="lg">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Preview */}
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-display font-semibold mb-4">Preview</h3>
                    <div className="w-64 h-64 glass rounded-2xl p-4 flex items-center justify-center">
                        <div className="w-48 h-48">
                            <Avatar customization={tempAvatar} />
                        </div>
                    </div>
                </div>

                {/* Customization Options */}
                <div className="space-y-6">
                    {/* Skin Tone - Available for all stages */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Skin Tone</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {skinTones.map((tone) => (
                                <button
                                    key={tone.value}
                                    onClick={() => setTempAvatar({ ...tempAvatar, skinTone: tone.value })}
                                    className={`p-3 rounded-lg border-2 transition-all ${tempAvatar.skinTone === tone.value
                                        ? 'border-bloom-500 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    title={tone.label}
                                >
                                    <div
                                        className="w-full h-8 rounded"
                                        style={{ backgroundColor: tone.color }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Hair Options - Only for Child and above */}
                    {stage !== 'baby' && (
                        <>
                            {/* Hair Style */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Hair Style</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {hairStyles.map((style) => (
                                        <button
                                            key={style.value}
                                            onClick={() => setTempAvatar({ ...tempAvatar, hairStyle: style.value })}
                                            className={`px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium ${tempAvatar.hairStyle === style.value
                                                ? 'border-bloom-500 bg-bloom-50 text-bloom-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            {style.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Hair Color */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Hair Color</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {hairColors.map((color) => (
                                        <button
                                            key={color.value}
                                            onClick={() => setTempAvatar({ ...tempAvatar, hairColor: color.value })}
                                            className={`p-3 rounded-lg border-2 transition-all ${tempAvatar.hairColor === color.value
                                                ? 'border-bloom-500 shadow-lg'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            title={color.label}
                                        >
                                            <div
                                                className="w-full h-8 rounded"
                                                style={{ backgroundColor: color.color }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {stage === 'baby' && (
                        <div className="p-4 bg-bloom-50 rounded-xl text-center">
                            <p className="text-sm text-bloom-700">
                                Your baby pet is growing! Evolve to unlock hair styles.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-8">
                <Button variant="ghost" onClick={handleCancel} fullWidth>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave} fullWidth>
                    Save Changes
                </Button>
            </div>
        </Modal>
    );
};
