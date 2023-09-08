const INITIAL_STATE = {
  player1: {
    pseudo: "",
    playerClass: {
      className: "",
      hp: null,
      atk: null,
      int: null,
      spd: null,
      agi: null,
      armor: null,
      color: "",
      icon: "",
      potions: null,
      onDef: false,
      ultimUp: true,
    },
  },
  player2: {
    pseudo: "",
    playerClass: {
      className: "",
      hp: null,
      atk: null,
      int: null,
      spd: null,
      agi: null,
      armor: null,
      color: "",
      icon: "",
      potions: null,
      onDef: false,
      ultimUp: true,
    },
  },
};

const playersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PLAYER_PSEUDO": {
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          pseudo: action.payload.pseudo,
        },
      };
    }

    case "UPDATE_PLAYER_CLASS": {
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          playerClass: action.payload.playerClass,
        },
      };
    }

    case "PLAYER_TAKE_DMG": {
      const { player, hitValue } = action.payload;
      const playerData = state[player];

      if (playerData && playerData.playerClass && playerData.playerClass.hp) {
        const newHP = playerData.playerClass.hp - hitValue;

        return {
          ...state,
          [player]: {
            ...state[player],
            playerClass: {
              ...state[player].playerClass,
              hp: newHP,
            },
          },
        };
      }
    }
    case "PLAYER_DEFENSE_UP": {
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          playerClass: {
            ...state[action.payload.player].playerClass,
            onDef: true,
            agi: state[action.payload.player].playerClass.agi + 4,
          },
        },
      };
    }
    case "PLAYER_DEFENSE_DOWN": {
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          playerClass: {
            ...state[action.payload.player].playerClass,
            onDef: false,
            agi: state[action.payload.player].playerClass.agi - 4,
          },
        },
      };
    }

    case "PLAYER_ULTIM_DOWN": {
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          playerClass: {
            ...state[action.payload.player].playerClass,
            ultimUp: false,
          },
        },
      };
    }

    case "PLAYER_POTION_MODIFICATION": {
      const { attacker, defender } = action.payload;
      const attackerData = state[attacker];
      const newAttackerPotions = attackerData.playerClass.potions + 1;
      const defenderData = state[defender];
      const newDefenderPotions = Math.max(
        0,
        defenderData.playerClass.potions - 1
      );
      return {
        ...state,
        [attacker]: {
          ...state[attacker],
          playerClass: {
            ...state[attacker].playerClass,
            potions: newAttackerPotions,
          },
        },
        [defender]: {
          ...state[defender],
          playerClass: {
            ...state[defender].playerClass,
            potions: newDefenderPotions,
          },
        },
      };
    }

    case "PLAYER_POTION_HEAL": {
      const { player } = action.payload;
      const playerData = state[player];
      const minHealPercentage = 10;
      const maxHealPercentage = 20;
      const baseHP = 300; // MAXHP
      if (
        playerData &&
        playerData.playerClass &&
        playerData.playerClass.hp &&
        playerData.playerClass.potions > 0
      ) {
        const minHeal = (minHealPercentage / 100) * baseHP;
        const maxHeal = (maxHealPercentage / 100) * baseHP;
        const randomHeal = Math.floor(
          Math.random() * (maxHeal - minHeal + 1) + minHeal
        );
        const newHP = Math.min(baseHP, playerData.playerClass.hp + randomHeal);

        const newPotions =
          playerData.playerClass.potions > 0
            ? playerData.playerClass.potions - 1
            : playerData.playerClass.potions;

        return {
          ...state,
          [player]: {
            ...state[player],
            playerClass: {
              ...state[player].playerClass,
              hp: newHP,
              potions: newPotions,
            },
          },
        };
      } else {
        return state;
      }
    }

    case "RESET_PLAYERS_REDUCER": {
      return INITIAL_STATE;
    }

    default: {
      return state;
    }
  }
};

export default playersReducer;
